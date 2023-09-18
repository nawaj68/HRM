using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.EntityConfiguration.Configurations
{
    public class HobbyTypeConfiguration
    {
        public void Configure(EntityTypeBuilder<HobbyType> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
