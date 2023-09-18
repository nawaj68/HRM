using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Core.DataType;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.Contacts).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.Contacts).HasForeignKey(p => p.EmployeeId);
            builder.HasOne(p => p.Country).WithMany(m => m.Contacts).HasForeignKey(p => p.PresentCountryId);
            builder.HasOne(p => p.State).WithMany(m => m.Contacts).HasForeignKey(p => p.PresentStateId);
            builder.HasOne(p => p.City).WithMany(m => m.Contacts).HasForeignKey(p => p.PresentCityId);
            builder.HasOne(p => p.Country).WithMany(m => m.Contacts).HasForeignKey(p => p.PermanentCountryId);
            builder.HasOne(p => p.State).WithMany(m => m.Contacts).HasForeignKey(p => p.PermanentStateId);
            builder.HasOne(p => p.City).WithMany(m => m.Contacts).HasForeignKey(p => p.PermanentCityId);
        }
    }
}
