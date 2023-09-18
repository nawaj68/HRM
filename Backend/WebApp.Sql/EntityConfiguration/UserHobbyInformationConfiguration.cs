using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class UserHobbyInformationConfiguration : IEntityTypeConfiguration<UserHobbyInformation>
    {
        public void Configure(EntityTypeBuilder<UserHobbyInformation> builder)
        {
            //builder.ToTable("Users");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.UserInformation).WithMany(m => m.UserHobbyInformations).HasForeignKey(p => p.UserInformationId);
        }
    }
}
