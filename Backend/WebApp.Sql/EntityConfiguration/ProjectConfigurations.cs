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
    public class ProjectConfigurations : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.Projects).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Company).WithMany(m => m.Projects).HasForeignKey(p => p.CompanyId);
            builder.HasOne(p => p.Branch).WithMany(m => m.Projects).HasForeignKey(p => p.BranchId);
        }
    }
}
