using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration.Configurations
{
    public class NewJobStatusConfiguration : IEntityTypeConfiguration<NewJobStatus>
    {
        public void Configure(EntityTypeBuilder<NewJobStatus> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.CompanyInfo).WithMany(m => m.NewJobStatuses).HasForeignKey(p => p.CompanyId);
            builder.HasOne(p => p.BranchInfo).WithMany(m => m.NewJobStatuses).HasForeignKey(p => p.BranchId);
            builder.HasOne(p => p.Project).WithMany(m => m.NewJobStatuses).HasForeignKey(p => p.ProjectId);
        }
    }
}
