using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.EntityConfiguration
{
    public class StateConfiguration : IEntityTypeConfiguration<State>
    {
        public void Configure(EntityTypeBuilder<State> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.Country).WithMany(m => m.States).HasForeignKey(p => p.CountryId);
        }
    }
}
