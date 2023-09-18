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
    public class BankInfoConfigurations : IEntityTypeConfiguration<BankInfo>
    {
        public void Configure(EntityTypeBuilder<BankInfo> builder)
        {
            builder.HasKey(x=>x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.BankInfos).HasForeignKey(p=>p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.BankInfos).HasForeignKey(p=>p.EmployeeId);
            builder.HasOne(p => p.BranchInfo).WithMany(m => m.BankInfos).HasForeignKey(p=>p.BranchId);
        }
    }
}
