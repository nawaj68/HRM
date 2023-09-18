
//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace WebApp.Extensions
{
    //public class CustomAuthorizeAttribute : AuthorizeAttribute
    //{
    //    public override void OnAuthorization(HttpActionContext actionContext)
    //    {
    //        // spiting different roles by ',' 
    //        var roles = this.Roles.Split(',');
    //        this.Roles = this.Roles + ',' + "admin";
    //        this.Roles = this.Roles + ',' + "adminsuper";

    //    }

    //    //protected override bool IsAuthorized(HttpActionContext actionContext)
    //    //{
    //    //    // spiting different roles by ',' 
    //    //    var roles = this.Roles.Split(',');
    //    //    // rest of your code


    //    //    return true;
    //    //}

    //}

    //[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class CustomAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        public CustomAuthorizeAttribute()
        {
        }


        /// <summary>
        /// usage [AuthorizeRoles(MyRoles.Admin, MyRoles.User)]
        /// </summary>
        /// <param name="allowedRoles"></param>
        public CustomAuthorizeAttribute(params string[] allowedRoles)
        {
            //var allowedRolesAsStrings = allowedRoles.Select(x => Enum.GetName(typeof(MyRoles), x));
            Roles = string.Join(",", allowedRoles);
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;


            if (!user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var roles = this.Roles.Split(',');
            var userRoles = user.Claims.Where(e => e.Type == ClaimTypes.Role).Select(e => e.Value);
            var userRolesdata = string.Join(',', userRoles).Split(',');

            var roles1 = this.Roles.Length;
            var valid = roles.Any(e => userRolesdata.Contains(e));

            //var valid = roles.Any(e => user.IsInRole(e));
            if (!valid)
            {
                context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
                return;
            }
        }
    }
}
