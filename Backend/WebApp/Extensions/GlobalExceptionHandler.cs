using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebApp.Common.Serialize;

namespace WebApp.Extensions
{
    public static class GlobalExceptionHandler
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = contextFeature.Error;

                    if (contextFeature != null)
                    {
                        Log.Error($"-0-0-0-Something went exception wrong: {contextFeature.Error}");

                        await context.Response.WriteAsync(
                            new ErrorDetails()
                            {
                                StatusCode = context.Response.StatusCode,
                                Message = exception.Message //"Internal Server Error." 
                            }.ToString()
                        );
                    }
                });
            });
        }
    }
}

public class ErrorDetails
{
    public int StatusCode { get; set; }
    public string Message { get; set; }


    public override string ToString()
    {
        return this.ToJson();
        //return JsonConvert.SerializeObject(this);
    }
}

// startup.cs
// usage app.GlobalExceptionHandler(logger);
