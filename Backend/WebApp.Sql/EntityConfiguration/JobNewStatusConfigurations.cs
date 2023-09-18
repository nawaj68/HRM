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
    public class JobNewStatusConfigurations : IEntityTypeConfiguration<JobNewStatus>
    {
        public void Configure(EntityTypeBuilder<JobNewStatus> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.JobNewStatus).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.JobNewStatus).HasForeignKey(p => p.EmployeeId);
        }
    }
}
