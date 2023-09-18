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
    public class EducationTypeConfiguration : IEntityTypeConfiguration<EducationType>
    {
        public void Configure(EntityTypeBuilder<EducationType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.CompanyInfo).WithMany(m => m.EducationTypes).HasForeignKey(p => p.CompanyId);
        }
    }
}
