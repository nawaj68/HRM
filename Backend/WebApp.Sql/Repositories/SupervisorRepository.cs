using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Sqls;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Repositories
{
    public class SupervisorRepository : SqlRepository<Supervisor>, ISupervisorRepository
    {

        public SupervisorRepository(WebAppContext dbContext) : base(dbContext)
        {
        }
    }
}
