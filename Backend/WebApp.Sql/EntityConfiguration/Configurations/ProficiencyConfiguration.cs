using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.EntityConfiguration.Configurations
{
    public class ProficiencyConfiguration : IEntityTypeConfiguration<Proficiency>
    {
        public void Configure(EntityTypeBuilder<Proficiency> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
