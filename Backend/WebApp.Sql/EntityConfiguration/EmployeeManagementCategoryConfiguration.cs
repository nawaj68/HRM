using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    internal class EmployeeManagementCategoryConfiguration : IEntityTypeConfiguration<EmployeeManagementCategory>
    {
        public void Configure(EntityTypeBuilder<EmployeeManagementCategory> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.EmployeeManagementCategories).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.EmployeeManagementCategories).HasForeignKey(p => p.EmployeeId);
        }
    }
}
