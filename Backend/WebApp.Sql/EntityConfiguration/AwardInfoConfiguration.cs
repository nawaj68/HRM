using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class AwardInfoConfiguration : IEntityTypeConfiguration<AwardInfo>
    {
        public void Configure(EntityTypeBuilder<AwardInfo> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.AwardInfos).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.AwardInfos).HasForeignKey(p => p.EmployeeId);
            builder.HasOne(p=>p.AwardType).WithMany(m=>m.AwardInfos).HasForeignKey(p=>p.AwardTypeId);
        }
    }
}
