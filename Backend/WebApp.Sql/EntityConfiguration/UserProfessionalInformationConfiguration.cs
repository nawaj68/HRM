using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class UserProfessionalInformationConfiguration : IEntityTypeConfiguration<UserProfessionalInformation>
    {
        public void Configure(EntityTypeBuilder<UserProfessionalInformation> builder)
        {
            //builder.ToTable("Users");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.UserInformation).WithMany(m => m.UserProfessionalInformations).HasForeignKey(p => p.UserInformationId);
        }
    }
}
