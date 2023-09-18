using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
//using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.EntityConfiguration
{
    public class DocumentConfinguration : IEntityTypeConfiguration<Document>
    {
        public void Configure(EntityTypeBuilder<Document> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.User).WithMany(m => m.Documents).HasForeignKey(p => p.UserId);
            builder.HasOne(p => p.Employees).WithMany(m => m.Documents).HasForeignKey(p => p.EmployeeId);
            builder.HasOne(p=>p.DocumentType).WithMany(m=>m.Documents).HasForeignKey(p => p.DocumentTypeId);
        }
    }
}
