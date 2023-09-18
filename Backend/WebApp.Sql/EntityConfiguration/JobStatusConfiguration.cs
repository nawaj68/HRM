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
    public class JobStatusConfiguration : IEntityTypeConfiguration<JobStatus>
    {
        public void Configure(EntityTypeBuilder<JobStatus> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.Status).WithMany(t=>t.JobStatus).HasForeignKey(f=>f.StatusId);
            builder.HasOne(p => p.Employees).WithMany(t => t.JobStatus).HasForeignKey(f => f.EmployeeId);
        }
    }
}
