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
    public class PassportConfiguration : IEntityTypeConfiguration<Passport>
    {
        public void Configure(EntityTypeBuilder<Passport> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.Passports).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.Passports).HasForeignKey(p => p.EmployeeId);
            builder.HasOne(p => p.Country).WithMany(m => m.Passports).HasForeignKey(p => p.CountryId);
        }
    }
}
