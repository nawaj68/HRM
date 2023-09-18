using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Identities
{
    public class IdentityModel
    {
        [Table("Users")]
        public class User : IdentityUser<long>
        {
            //[Required]
            //[MaxLength(100)]
            //public string Firstname { get; set; }

            //[MaxLength(100)]
            //public string Lastname { get; set; }

            //[MaxLength(512)]
            //public string Address1 { get; set; }

            //[MaxLength(512)]
            //public string Address2 { get; set; }

            public long CreatedUserId { get; set; }
            public DateTime CreatedDateTimeUtc { get; set; }
            public long UpdatedUserId { get; set; }
            public DateTime? UpdatedDateTimeUtc { get; set; }

            public IList<UserInformation> UserInformations { get; set; }
            public IList<Contact> Contacts { get; set; }
            public IList<FamilyInfo> FamilyInfos { get; set; }  
            public IList<Employees> Employees { get; set;}
            public IList<FunctionalDesignation> FunctionalDesignations { get; set; }
            public IList<Supervisor> Supervisors { get; set; }
            public IList<DepartmentSetup> DepartmentSetups { get; set; }
            public IList<CompanyInfo> CompanyInfos { get; set; }
            public IList<BranchInfo> BranchInfos { get; set; }
            //public IList<AssetType> AssetTypes { get; set; }
            // public IList<Asset> Assets { get; set; }
            //public IList<Project> Projects { get; set; }
            public IList<Warning> Warnings { get; set; }
            public IList<Passport> Passports { get; set; }
            public IList<Language> Languages { get; set; }
            public IList<EmployeeManagementCategory> EmployeeManagementCategories { get; set; }

            public IList<AssetType> AssetTypes { get; set; }
            public IList<Asset> Assets { get; set; }
            public IList<Project> Projects { get; set; }

            public IList<AssetRequisition> AssetRequisitions { get; set; }
            public IList<JobNewStatus> JobNewStatus { get; set; }
            public IList<DistributeAsset> DistributeAssets { get; set; }

            public IList<BankInfo> BankInfos { get; set; }
            public IList<DesignationSetup> DesignationSetups { get; set; }

            public IList<Document> Documents { get; set; }
            public IList<AwardInfo> AwardInfos { get; set; }
            public IList<DocumentType> DocumentTypes { get; set; }
        }

        [Table("UserRoles")]
        public class UserRole : IdentityUserRole<long>
        {
        }

        [Table("UserClaims")]
        public class UserClaim : IdentityUserClaim<long>
        {
        }

        public class UserLogin : IdentityUserLogin<long>
        {
            [ForeignKey("User"), Key]
            public override long UserId { get => base.UserId; set => base.UserId = value; }
            public User User { get; set; }
        }

        [NotMapped]
        public class RoleClaim : IdentityRoleClaim<long>
        {
        }

        [Table("UserTokens")]
        public class UserToken : IdentityUserToken<long>
        {
        }

        [Table("Roles")]
        public class Role : IdentityRole<long>
        {
            public Role() { }
            public Role(string name) { Name = name; }

            public int StatusId { get; set; }
            public string Description { get; set; }

            public long CreatedBy { get; set; }
            public DateTime CreatedDateUtc { get; set; }
            public long UpdatedBy { get; set; }
            public DateTime? UpdatedDateUtc { get; set; }
        }
    }
}
