using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Extensions
{
    public static class HttpExtension
    {
        private static readonly JsonSerializer Serializer = new JsonSerializer
        {
            NullValueHandling = NullValueHandling.Ignore
        };

        public static void WriteJson<T>(this HttpResponse response, T obj, string contentType = null)
        {
            response.ContentType = contentType ?? "application/json";
            using (var writer = new HttpResponseStreamWriter(response.Body, Encoding.UTF8))
            {
                using (var jsonWriter = new JsonTextWriter(writer))
                {
                    jsonWriter.CloseOutput = false;
                    jsonWriter.AutoCompleteOnClose = false;

                    Serializer.Serialize(jsonWriter, obj);
                }
            }
        }

        public static object CurrentUserInfos(this IHttpContextAccessor httpContextAccessor)
        {
            object internalUserInfos = null;
            if (httpContextAccessor?.HttpContext?.User?.Claims != null)
            {
                string userData = httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.UserData).Value;
                internalUserInfos = JsonConvert.DeserializeObject<object>(userData);
            }

            return internalUserInfos;
        }
    }
}

// https://www.strathweb.com/2018/07/centralized-exception-handling-and-request-validation-in-asp-net-core/

