using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Extensions
{
    public class SwaggerAuthorizationFilter : IDocumentFilter
    {
        //private IServiceProvider _provider;

        //public SwaggerAuthorizationFilter(IServiceProvider provider)
        //{
        //    if (provider == null) throw new ArgumentNullException(nameof(provider));

        //    this._provider = provider;
        //}

        //public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        //{
        //    var http = this._provider.GetRequiredService<IHttpContextAccessor>();
        //    var password = "mySecretPassword!";         // Password hard coded for brievity. 
        //                                                // When using this in a real application, you should store the password safely using appsettings or some other method.
        //    var header = http.HttpContext.Request.Headers["Swagger-Content"];
        //    var show = password.Equals(header.FirstOrDefault());

        //    if (!show)
        //    {
        //        #region Hide method endpoints 
        //        var descriptions = context.ApiDescriptionsGroups.Items.SelectMany(group => group.Items);

        //        foreach (var description in descriptions)
        //        {
        //            var route = "/" + description.RelativePath.TrimEnd('/');
        //            var path = swaggerDoc.Paths[route];

        //            // remove method or entire path (if there are no more methods in this path)
        //            switch (description.HttpMethod)
        //            {
        //                case "DELETE": path.Delete = null; break;
        //                case "GET": path.Get = null; break;
        //                case "HEAD": path.Head = null; break;
        //                case "OPTIONS": path.Options = null; break;
        //                case "PATCH": path.Patch = null; break;
        //                case "POST": path.Post = null; break;
        //                case "PUT": path.Put = null; break;
        //                default: throw new ArgumentOutOfRangeException("Method name not mapped to operation");
        //            }

        //            if (path.Delete == null && path.Get == null &&
        //                path.Head == null && path.Options == null &&
        //                path.Patch == null && path.Post == null && path.Put == null)
        //                swaggerDoc.Paths.Remove(route);
        //        }
        //        #endregion

        //        #region Hide models 
        //        swaggerDoc.Definitions.Clear();
        //        #endregion
        //    }
        //}


        private readonly IServiceProvider _provider;

        public SwaggerAuthorizationFilter(IServiceProvider provider)
        {
            if (provider == null) throw new ArgumentNullException(nameof(provider));

            _provider = provider;
        }

        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            var http = _provider.GetRequiredService<IHttpContextAccessor>();
            var auth = _provider.GetRequiredService<IAuthorizationService>();

            foreach (var description in context.ApiDescriptions)
            {
                var authAttributes = description.CustomAttributes().OfType<AuthorizeAttribute>();
                bool notShowen = isForbiddenDueAnonymous(http, authAttributes) ||
                                isForbiddenDuePolicy(http, auth, authAttributes);

                if (!notShowen)
                    continue; // user passed all permissions checks

                var route = "/" + description.RelativePath.TrimEnd('/');
                var path = swaggerDoc.Paths[route];

                // remove method or entire path (if there are no more methods in this path)
                OperationType operation = Enum.Parse<OperationType>(description.HttpMethod, true);
                path.Operations.Remove(operation);
                if (path.Operations.Count == 0)
                {
                    swaggerDoc.Paths.Remove(route);
                }
            }
        }

        private static bool isForbiddenDuePolicy(
            IHttpContextAccessor http,
            IAuthorizationService auth,
            IEnumerable<AuthorizeAttribute> attributes)
        {
            var policies = attributes
                .Where(p => !String.IsNullOrEmpty(p.Policy))
                .Select(a => a.Policy)
                .Distinct();

            var result = Task.WhenAll(policies.Select(p => auth.AuthorizeAsync(http.HttpContext.User, p))).Result;
            return result.Any(r => !r.Succeeded);
        }

        private static bool isForbiddenDueAnonymous(
            IHttpContextAccessor http,
            IEnumerable<AuthorizeAttribute> attributes)
        {
            return attributes.Any() && !http.HttpContext.User.Identity.IsAuthenticated;
        }
    }
}
