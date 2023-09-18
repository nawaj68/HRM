using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class UserBasicInformationConfiguration : IEntityTypeConfiguration<UserBasicInformation>
    {
        public void Configure(EntityTypeBuilder<UserBasicInformation> builder)
        {
            //builder.ToTable("Users");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.UserInformation).WithMany(m => m.UserBasicInformations).HasForeignKey(p => p.UserInformationId);
        }
    }
}
