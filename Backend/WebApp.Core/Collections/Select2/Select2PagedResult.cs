using System.Collections.Generic;

namespace WebApp.Core.Collections.Select2
{
    public class Select2PagedResult
    {
        public int Total { get; set; }
        public List<Select2Result> Results { get; set; }
    }
}