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
    public class WarningConfigurations : IEntityTypeConfiguration<Warning>
    {
        public void Configure(EntityTypeBuilder<Warning> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.Warnings).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.Warnings).HasForeignKey(p => p.EmployeeId);
        }
    }
}
