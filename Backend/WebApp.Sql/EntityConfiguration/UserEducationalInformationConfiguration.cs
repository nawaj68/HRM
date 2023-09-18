using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class UserEducationalInformationConfiguration : IEntityTypeConfiguration<UserEducationalInformation>
    {
        public void Configure(EntityTypeBuilder<UserEducationalInformation> builder)
        {
            //builder.ToTable("Users");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.UserInformation).WithMany(m => m.UserEducationalInformations).HasForeignKey(p => p.UserInformationId);
        }
    }
}
