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
    public class DepartmentSetupConfiguration : IEntityTypeConfiguration<DepartmentSetup>
    {
        public void Configure(EntityTypeBuilder<DepartmentSetup> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.User).WithMany(m => m.DepartmentSetups).HasForeignKey(x => x.UserId);
            builder.HasOne(x => x.Employees).WithMany(m => m.DepartmentSetups).HasForeignKey(x => x.EmployeeId);
            builder.HasOne(x => x.Department).WithMany(m => m.DepartmentSetups).HasForeignKey(x => x.DepartmentId);
        }
    }
}
