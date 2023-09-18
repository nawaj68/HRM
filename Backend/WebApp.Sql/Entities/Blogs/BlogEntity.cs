using System.Collections.Generic;

namespace WebApp.Sql.Entities.Blogs
{
    public class Blog : BaseEntity
    {
        public string Name { get; set; }
        public IList<Category> Categories { get; set; }
    }

    public class Category: BaseEntity
    {

    }
}
