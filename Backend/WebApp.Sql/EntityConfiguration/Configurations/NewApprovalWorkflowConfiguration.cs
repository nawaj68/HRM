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
    public class NewApprovalWorkflowConfiguration : IEntityTypeConfiguration<NewApprovalWorkflow>
    {
        public void Configure(EntityTypeBuilder<NewApprovalWorkflow> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.Company).WithMany(m => m.NewApprovalWorkflows).HasForeignKey(p => p.CompanyId);
        }
    }
}
