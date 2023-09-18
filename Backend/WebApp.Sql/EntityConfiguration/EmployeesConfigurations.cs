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
    public class EmployeesConfigurations : IEntityTypeConfiguration<Employees>
    {
        public void Configure(EntityTypeBuilder<Employees> builder)
        {        
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.Employees).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Department).WithMany(m => m.Employees).HasForeignKey(p => p.DepartmentId);
            builder.HasOne(p => p.Designation).WithMany(m => m.Employees).HasForeignKey(p => p.DesignationId);
            builder.HasOne(p => p.Gender).WithMany(m => m.Employees).HasForeignKey(p => p.GenderId);
        }
    }
}
