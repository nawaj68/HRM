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
    public class DesignationSetupConfiguration : IEntityTypeConfiguration<DesignationSetup>
    {
        public void Configure(EntityTypeBuilder<DesignationSetup> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(t => t.DesignationSetups).HasForeignKey(t=>t.UserId);
            builder.HasOne(p => p.Employees).WithMany(t => t.DesignationSetups).HasForeignKey(f => f.EmployeeId);
            builder.HasOne(p => p.Designation).WithMany(t => t.DesignationSetups).HasForeignKey(f => f.DesignationId);
        }
    }
}
