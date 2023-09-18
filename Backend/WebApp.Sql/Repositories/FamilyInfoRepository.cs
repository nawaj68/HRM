using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Sqls;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Repositories
{
    public class FamilyInfoRepository : SqlRepository<FamilyInfo>, IFamilyInfoRepository
    {
        public FamilyInfoRepository(WebAppContext Context) : base(Context)
        {
        }

    }
}
