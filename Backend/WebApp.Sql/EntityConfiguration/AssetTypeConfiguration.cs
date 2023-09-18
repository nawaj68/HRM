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
    public class AssetTypeConfiguration : IEntityTypeConfiguration<AssetType>
    {
        public void Configure(EntityTypeBuilder<AssetType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.AssetTypes).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Branch).WithMany(m => m.AssetTypes).HasForeignKey(p => p.BranchId);
            builder.HasOne(p => p.Company).WithMany(m => m.AssetTypes).HasForeignKey(p => p.CompanyId);
        }
    }
}
