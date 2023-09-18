using System;

namespace WebApp.Core
{
    public static class ExceptionExtension
    {
        public static string GetOriginalException(this Exception ex)
        {
            while (ex.InnerException != null) ex = ex.InnerException;
            return ex.Message;
        }
    }
}
