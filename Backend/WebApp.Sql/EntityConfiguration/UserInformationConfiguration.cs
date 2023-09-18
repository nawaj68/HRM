using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class UserInformationConfiguration : IEntityTypeConfiguration<UserInformation>
    {
        public void Configure(EntityTypeBuilder<UserInformation> builder)
        {
            //builder.ToTable("Users");

            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.UserInformations).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Country).WithMany(m => m.UserInformations).HasForeignKey(p => p.CountryId);
            builder.HasOne(p => p.Nationality).WithMany(m => m.UserInformationNationalities).HasForeignKey(p => p.NationalityId);
            builder.HasOne(p => p.State).WithMany(m => m.UserInformations).HasForeignKey(p => p.StateId);
            builder.HasOne(p => p.City).WithMany(m => m.UserInformations).HasForeignKey(p => p.CityId);
            builder.HasOne(p => p.Religion).WithMany(m => m.UserInformation).HasForeignKey(p => p.ReligionId);
            builder.HasOne(p => p.Gender).WithMany(m => m.UserInformation).HasForeignKey(p => p.GenderId);
        }
    }
}
