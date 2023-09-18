using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.Swagger;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using WebApp.Common.Serialize;
using WebApp.Core;
using WebApp.Core.Collections;

namespace WebApp.Extensions
{
    public class ApiOkActionResult : IActionResult
    {
        private readonly object _result;

        public ApiOkActionResult(object result)
        {
            _result = result;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            if (_result?.GetType().Name == typeof(Paging<>).Name)
            {
                var total =  _result.GetPropValue("Total");
                var response = context.HttpContext.Response;
                response.Headers.Add("X-Total-Count", total.ToString());
            }

            var objectResult = new ObjectResult(_result)
            {
                StatusCode = StatusCodes.Status200OK,
                Value = new ApiResponse(_result)
            };

            await objectResult.ExecuteResultAsync(context);
        }
    }
}
