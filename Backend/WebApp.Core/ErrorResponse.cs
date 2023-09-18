using System.Collections.Generic;

namespace WebApp.Common
{
    /// <summary>
    /// Rest API error response
    /// </summary>
    public class ErrorResponse
    {
        public ErrorResponse() { }

        public ErrorResponse(string message)
        {
            Message = message;
        }

        public ErrorResponse(string message, params object[] args)
        {
            Message = string.Format(message, args);
        }

        public ErrorResponse(IEnumerable<string> messages)
        {
            Message = string.Join(" ", messages);
        }

        public string Message { get; set; }
    }
}
