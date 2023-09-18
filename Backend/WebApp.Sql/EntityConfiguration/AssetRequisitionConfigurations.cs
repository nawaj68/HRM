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
    public class AssetRequisitionConfigurations : IEntityTypeConfiguration<AssetRequisition>
    {
        public void Configure(EntityTypeBuilder<AssetRequisition> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.AssetRequisitions).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.AssetRequisitions).HasForeignKey(p => p.EmployeeId);
            builder.HasOne(p => p.Assets).WithMany(m => m.AssetRequisitions).HasForeignKey(p => p.AssetId);
        }
    }
}
