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
    public class AssetConfigurations : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.Assets).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.CompanyInfo).WithMany(m => m.Assets).HasForeignKey(p => p.CompanyId);
            builder.HasOne(p => p.AssetType).WithMany(m => m.Assets).HasForeignKey(p => p.AssetTypeId);
        }
    }
}
