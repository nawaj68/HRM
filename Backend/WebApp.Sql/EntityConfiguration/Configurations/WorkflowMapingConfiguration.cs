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
    public class WorkflowMapingConfiguration : IEntityTypeConfiguration<WorkflowMaping>
    {
        public void Configure(EntityTypeBuilder<WorkflowMaping> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.Company).WithMany(m => m.WorkflowMapings).HasForeignKey(p => p.CompanyId);
            builder.HasOne(p => p.Employees).WithMany(m => m.WorkflowMapings).HasForeignKey(p => p.EmployeeId);
            builder.HasOne(p => p.Branch).WithMany(m => m.WorkflowMapings).HasForeignKey(p => p.BranchId);
            builder.HasOne(p => p.Workflow).WithMany(m => m.WorkflowMapings).HasForeignKey(p => p.WorkflowId);
            builder.HasOne(p => p.Department).WithMany(m => m.WorkflowMapings).HasForeignKey(p => p.DepartmentId);
        }
    }
}
