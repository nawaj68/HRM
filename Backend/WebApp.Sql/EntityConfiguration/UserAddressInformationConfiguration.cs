using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class UserAddressInformationConfiguration : IEntityTypeConfiguration<UserAddressInformation>
    {
        public void Configure(EntityTypeBuilder<UserAddressInformation> builder)
        {
            //builder.ToTable("UserAddresses");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.UserInformation).WithMany(m => m.UserAddressInformations).HasForeignKey(p => p.UserInformationId);
        }
    }
}
