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
    public class EducationConfiguration : IEntityTypeConfiguration<Education>
    {
        public void Configure(EntityTypeBuilder<Education> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p=>p.Employees).WithMany(t=>t.Educations).HasForeignKey(f=>f.EmployeeId);
            builder.HasOne(p => p.EducationGroup).WithMany(t => t.Educations).HasForeignKey(f => f.EgucationGroupId);
            builder.HasOne(p => p.EducationType).WithMany(t => t.Educations).HasForeignKey(f => f.EducationTypeId);
            builder.HasOne(p => p.Grade).WithMany(t => t.Educations).HasForeignKey(f => f.GradeId);
            builder.HasOne(p => p.Institute).WithMany(t => t.Educations).HasForeignKey(f => f.InstituteId);
        }
    }
}
