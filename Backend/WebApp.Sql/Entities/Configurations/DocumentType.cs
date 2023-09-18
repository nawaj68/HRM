using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class DocumentType:BaseEntity
    {
        public string DocumentTypeName { get; set; }
        public IList<Document> Documents { get; set; }
    }
}
