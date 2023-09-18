using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;
using Serilog.Context;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Extensions
{
    public class RequestHandler
    {
        readonly RequestDelegate _next;

        public RequestHandler(RequestDelegate next)
        {
            if (next == null) throw new ArgumentNullException(nameof(next));
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {

            if (httpContext == null) throw new ArgumentNullException(nameof(httpContext));

            // Getting the request body is a little tricky because it's a stream
            // So, we need to read the stream and then rewind it back to the beginning
            string requestBody = "";
            httpContext.Request.EnableBuffering();
            Stream body = httpContext.Request.Body;
            byte[] buffer = new byte[Convert.ToInt32(httpContext.Request.ContentLength)];
            await httpContext.Request.Body.ReadAsync(buffer, 0, buffer.Length);
            requestBody = Encoding.UTF8.GetString(buffer);
            body.Seek(0, SeekOrigin.Begin);
            httpContext.Request.Body = body;
            using (var responseBodyMemoryStream = new MemoryStream())
            {
                Guid errorId = Guid.NewGuid();
                Exception exceptions = null;

                var originalResponseBodyReference = httpContext.Response.Body;
                httpContext.Response.Body = responseBodyMemoryStream;
                try
                {
                    await _next(httpContext);
                }
                catch (Exception exception)
                {
                    exceptions = exception;

                    var result = JsonConvert.SerializeObject(new { error = "Sorry, an unexpected error has occurred", errorId = errorId });
                    httpContext.Response.ContentType = "application/json";
                    httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError; ;
                    //await httpContext.Response.WriteAsync(result);

                    // use this code or use GlobalExceptionHandler.cs in startup -> app.GlobalExceptionHandler();
                    await httpContext.Response.WriteAsync(
                        new ApiResponse
                        {
                            StatusCode = httpContext.Response.StatusCode,
                            Message = exception.Message //"Internal Server Error." 
                        }.ToString()
                    );
                }

                httpContext.Response.Body.Seek(0, SeekOrigin.Begin);
                var responseBody = await new StreamReader(httpContext.Response.Body).ReadToEndAsync();
                httpContext.Response.Body.Seek(0, SeekOrigin.Begin);

                // Push the user name into the log context so that it is included in all log entries
                LogContext.PushProperty("UserName", httpContext.User.Identity.Name);

                if (exceptions == null)
                    Log.ForContext("RequestHeaders", httpContext.Request.Headers.ToDictionary(h => h.Key, h => h.Value.ToString()), destructureObjects: true)
                   .ForContext("RequestBody", requestBody)
                   .ForContext("ResponseBody", responseBody).Debug("------------Request information {RequestMethod} {RequestPath} {statusCode}", httpContext.Request.Method, httpContext.Request.Path, httpContext.Response.StatusCode);
                else // skip else condition when we use GlobalExceptionHandler.cs in startup -> app.GlobalExceptionHandler() 
                    Log.ForContext("RequestHeaders", httpContext.Request.Headers.ToDictionary(h => h.Key, h => h.Value.ToString()), destructureObjects: true)
                    .ForContext("RequestBody", requestBody)
                    .ForContext("Exception", exceptions, destructureObjects: true)
                    .Error(exceptions, "--------Request information " + exceptions.Message + ". {@errorId}", errorId);

                await responseBodyMemoryStream.CopyToAsync(originalResponseBodyReference);
            }
        }
    }
}

// usage
// startup.cs
// app.UseMiddleware<RequestHandler>();

// https://www.carlrippon.com/adding-useful-information-to-asp-net-core-web-api-serilog-logs/