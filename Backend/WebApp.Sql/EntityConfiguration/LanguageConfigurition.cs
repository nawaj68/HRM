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
    public class LanguageConfigurition : IEntityTypeConfiguration<Language>
    {
        public void Configure(EntityTypeBuilder<Language> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(p => p.Languages).HasForeignKey(f => f.UserId);
            builder.HasOne(p => p.Employees).WithMany(p => p.Languages).HasForeignKey(f => f.EmployeeId);
            builder.HasOne(p => p.Proficiency).WithMany(p => p.Languages).HasForeignKey(f => f.ProficencyId);
        }
    }
}
