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
    public class FamilyInfoConfiguration : IEntityTypeConfiguration<FamilyInfo>
    {
        
        public void Configure(EntityTypeBuilder<FamilyInfo> builder)
        {
            //builder.ToTable("Users");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.FamilyInfos).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.FamilyInfos).HasForeignKey(p => p.EmployeeId);
        }
    }
}
