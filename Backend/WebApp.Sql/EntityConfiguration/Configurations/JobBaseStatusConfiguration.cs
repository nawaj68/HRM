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
    public class JobBaseStatusConfiguration : IEntityTypeConfiguration<JobBaseStatus>
    {
        public void Configure(EntityTypeBuilder<JobBaseStatus> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.CompanyInfo).WithMany(m => m.JobBaseStatuses).HasForeignKey(p => p.CompanyId);
            builder.HasOne(p => p.BranchInfo).WithMany(m => m.JobBaseStatuses).HasForeignKey(p => p.BranchId);
            builder.HasOne(p => p.Project).WithMany(m => m.JobBaseStatuses).HasForeignKey(p => p.ProjectId);
        }
    }
}
