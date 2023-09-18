using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class UserCertificationConfiguration : IEntityTypeConfiguration<UserCertification>
    {
        public void Configure(EntityTypeBuilder<UserCertification> builder)
        {
            //builder.ToTable("Users");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.UserInformation).WithMany(m => m.UserCertifications).HasForeignKey(p => p.UserInformationId);
        }
    }
}
