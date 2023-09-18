﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.EntityConfiguration.Configurations
{
    public class InstituteConfiguration : IEntityTypeConfiguration<Institute>
    {
        public void Configure(EntityTypeBuilder<Institute> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(p => p.CompanyInfo).WithMany(m => m.Institutes).HasForeignKey(p => p.CompanyId);
        }
    }
}
