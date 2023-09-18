using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class CompanyInfoConfigurations : IEntityTypeConfiguration<CompanyInfo>
    {
        public void Configure(EntityTypeBuilder<CompanyInfo> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.CompanyInfos).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Country).WithMany(m => m.CompanyInfos).HasForeignKey(p => p.CountryId);
            builder.HasOne(p => p.City).WithMany(m => m.CompanyInfos).HasForeignKey(p => p.CityId);
            builder.HasOne(p => p.State).WithMany(m => m.CompanyInfos).HasForeignKey(p => p.StateId);
        }
    }
}
