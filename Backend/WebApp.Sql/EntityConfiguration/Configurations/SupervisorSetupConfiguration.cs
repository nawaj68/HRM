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
    public class SupervisorSetupConfiguration : IEntityTypeConfiguration<SupervisorSetup>
    {
        public void Configure(EntityTypeBuilder<SupervisorSetup> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.Company).WithMany(m => m.SupervisorSetups).HasForeignKey(p => p.CompanyId);
            builder.HasOne(p => p.Employees).WithMany(m => m.SupervisorSetups).HasForeignKey(p => p.EmployeeId);
           
        }
    }
}
