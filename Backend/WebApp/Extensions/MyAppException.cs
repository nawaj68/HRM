using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Extensions
{
    public class MyAppException : Exception
    {
        public List<RecoveryLink> RecoveryLinks { get; }

        public MyAppException()
        {
            RecoveryLinks = new List<RecoveryLink>();
        }
        public MyAppException(string message) : base(message)
        {
            RecoveryLinks = new List<RecoveryLink>();
        }

        public MyAppException(Exception exception) : this(exception.Message)
        {
        }


        public MyAppException AddRecoveryLink(
                string text, string url)
        {
            RecoveryLinks.Add(new RecoveryLink(text, url));
            return this;
        }
        public MyAppException AddRecoveryLink(RecoveryLink link)
        {
            RecoveryLinks.Add(link);
            return this;
        }
    }
}


public class RecoveryLink
{
    public string Text { get; set; }
    public string Url { get; set; }

    public RecoveryLink(string text, string url)
    {
        Text = text;
        Url = url;
    }
}

// usage: throw new MyAppException("A severe error occurred").AddRecoveryLink("Google", "http://www.google.com");
// https://www.red-gate.com/simple-talk/dotnet/net-development/asp-net-core-3-0-exception-handling/