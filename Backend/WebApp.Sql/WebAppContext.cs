using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using WebApp.Core.Acls;
using WebApp.Sql.Entities;
using WebApp.Sql.Entities.Blogs;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;
using WebApp.Sql.Entities.Identities;
using WebApp.Sql.Entities.Logs;
using WebApp.Sql.Entities.Settings;
using WebApp.Sql.Extensions;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql
{
    public class WebAppContext : IdentityDbContext<User,
        Role, long,
        UserClaim,
        UserRole,
        UserLogin,
        RoleClaim,
        UserToken>
    {
        public const string DefaultSchemaName = "dbo";
        public string Schema { get; set; }

        public readonly ISignInHelper SignInHelper;

        public WebAppContext(DbContextOptions<WebAppContext> options, ISignInHelper signInHelper) : base(options)
        {
            SignInHelper = signInHelper;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine);
            optionsBuilder.LogTo(message => WriteSqlQueryLog(message));
            optionsBuilder.UseLoggerFactory(_myLoggerFactory);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasDefaultSchema(Schema);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            builder.RelationConvetion();
            builder.DecimalConvention();
            builder.DateTimeConvention();
        }

        public static readonly Microsoft.Extensions.Logging.LoggerFactory _myLoggerFactory = new LoggerFactory(new[] {
            new Microsoft.Extensions.Logging.Debug.DebugLoggerProvider()
                //new ConsoleLoggerProvider((_, __) => true, true)
        });

        #region acl entitites
        //public DbSet<IdentityRole<long>> AspNetRoles { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<RoleMenuMapper> RoleMenuMappers { get; set; }
        #endregion

        #region settings
        public DbSet<Setting> Settings { get; set; }
        #endregion

        #region logs
        public DbSet<SmsLog> SmsLogs { get; set; }
        public DbSet<EmailLog> EmailLogs { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<RequestLog> RequestLogs { get; set; }
        #endregion

        #region config
        public DbSet<Relation> Relations { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<City> Citys { get; set; }
        public DbSet<Proficiency> Proficiencies { get; set; }
        public DbSet<Religion> Religions { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<AwardType> AwardTypes { get; set; }
        public DbSet<BloodGroup> BloodGroups { get; set; }
        public DbSet<ClaimType> ClaimTypes { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<DocumentCategorie> DocumentCategorias { get; set; }
        public DbSet<EducationGroup> EducationsGroups { get; set; }
        public DbSet<EducationType> EducationsTypes { get; set; }
        public DbSet<EmploymentCategorie> EmploymentCategories { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<HobbyType> HobbyTypes { get; set; }
        public DbSet<Institute> Institutes { get; set; }
        public DbSet<JobBaseStatus> JobBaseStatuses { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<MaritalStatus> MaritalStatuses { get; set; }
        public DbSet<NewApprovalWorkflow> NewApprovalWorkflows { get; set; }
        public DbSet<NewJobStatus> NewJobStatus { get; set; }
        public DbSet<OpeningYear> OpeningYears { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SupervisorSetup> SupervisorSetups { get; set; }
        public DbSet<WarningType> WarningTypes { get; set; }
        public DbSet<WorkflowMaping> WorkflowMaps { get; set; }


        #endregion

        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetRequisition> AssetsRequisitions { get; set; }
        public DbSet<AssetType> AssetsTypes { get; set; }
        public DbSet<BankInfo> BankInfos { get; set; }
        public DbSet<BranchInfo> BranchInfos { get; set; }
        public DbSet<CompanyInfo> CompanyInfos { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<UserInformation> UserInformations { get;set;}
        public DbSet<UserBasicInformation> UserBasicInformations { get; set; }
        public DbSet<UserHobbyInformation> UserHobbyInformations { get; set; }
        public DbSet<UserEducationalInformation> UserEducationalInformations { get; set; }
        public DbSet<UserProfessionalInformation> UserProfessionalInformations { get; set; }
        public DbSet<UserCertification> UserCertifications { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<Employees> Employees { get; set; }
        public DbSet<FamilyInfo> FamilyInfos { get; set; }
        public DbSet<Supervisor> Supervisors { get; set; }
        public DbSet<DepartmentSetup> DepartmentSetups { get; set; }
        public DbSet<Warning> Warnings { get; set; }
        public DbSet<Passport> Passports { get; set; }
        public DbSet<FunctionalDesignation> FunctionalDesignations { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<AssetRequisition> AssetRequisitions { get; set; }
        public DbSet<DistributeAsset> DistributeAssets { get; set; }
        public DbSet<JobNewStatus> JobNewStatus { get; set; }
        public DbSet<EmployeeManagementCategory> EmployeeManagementCategories { get; set; }
        public DbSet<DesignationSetup> DesignationSetups { get; set; }
        public DbSet<JobStatus> JobStatuses { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<AwardInfo> AwardInfos { get; set; }
        public DbSet<AssetType> AssetTypes { get; set; }
        public DbSet<DocumentCategorie> DocumentCategories { get; set; }
        public DbSet<EducationGroup> EducationGroups { get; set; }
        public DbSet<EducationType> EducationTypes { get; set; }
        public DbSet<NewJobStatus> NewJobStatuses { get; set; }




        #region Audit
        private void Audit()
        {
            long userId = 0;
            var now = DateTimeOffset.UtcNow;

            if (SignInHelper.IsAuthenticated)
                userId = (long)SignInHelper.UserId;

            foreach (var entry in base
                .ChangeTracker.Entries<BaseEntity>()
                .Where(e => e.State == EntityState.Added
                         || e.State == EntityState.Modified))
            {
                if (entry.State != EntityState.Added)
                {
                    entry.Entity.UpdatedDateUtc ??= now;
                    entry.Entity.UpdatedBy ??= userId;
                }
                else
                {
                    entry.Entity.CreatedBy = entry.Entity.CreatedBy != 0 ? entry.Entity.CreatedBy : userId;
                    entry.Entity.CreatedDateUtc = entry.Entity.CreatedDateUtc == DateTimeOffset.MinValue ? now : entry.Entity.CreatedDateUtc;
                }
            }
        }

        private void AuditTrail()
        {
            long userId = 0;

            if (SignInHelper.IsAuthenticated)
                userId = (long)SignInHelper.UserId;

            ChangeTracker.DetectChanges();
            var auditEntries = new List<AuditEntry>();
            foreach (var entry in ChangeTracker.Entries())
            {
                if (entry.Entity is BaseEntity
                    || entry.Entity is AuditLog
                    || entry.State == EntityState.Detached
                    || entry.State == EntityState.Unchanged)
                    continue;

                var auditEntry = new AuditEntry(entry);
                auditEntry.TableName = entry.Entity.GetType().Name;
                auditEntry.UserId = userId;
                auditEntries.Add(auditEntry);
                foreach (var property in entry.Properties)
                {
                    string propertyName = property.Metadata.Name;
                    if (property.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValues[propertyName] = property.CurrentValue;
                        continue;
                    }
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            auditEntry.AuditType = AuditType.Create;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                            break;
                        case EntityState.Deleted:
                            auditEntry.AuditType = AuditType.Delete;
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            break;
                        case EntityState.Modified:
                            if (property.IsModified)
                            {
                                auditEntry.ChangedColumns.Add(propertyName);
                                auditEntry.AuditType = AuditType.Update;
                                auditEntry.OldValues[propertyName] = property.OriginalValue;
                                auditEntry.NewValues[propertyName] = property.CurrentValue;
                            }
                            break;
                    }
                }
            }
            foreach (var auditEntry in auditEntries)
            {
                AuditLogs.Add(auditEntry.ToAuditLog());
            }
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AuditTrail();
            Audit();

            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            AuditTrail();
            Audit();

            return base.SaveChanges();
        }
        #endregion

        private void WriteSqlQueryLog(string query, StoreType storeType = StoreType.Output)
        {
            if (storeType == StoreType.Output)
                Debug.WriteLine(query);
            else if (storeType == StoreType.Db)
            {
                // store in db
            }
            else if (storeType == StoreType.File)
            {
                // store & append in file
                //new StreamWriter("mylog.txt", append: true);
            }

            //using (WebAppContext context = new WebAppContext())
            //{
            //    context.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
            //}

            //IQueryable queryable = from x in Blogs
            //                       where x.Id == 1
            //                       select x;

            //var sqlEf5 = ((System.Data.Objects.ObjectQuery)queryable).ToTraceString();
            //var sqlEf6 = ((System.Data.Entity.Core.Objects.ObjectQuery)queryable).ToTraceString();
            //var sql = queryable.ToString();

            // https://docs.microsoft.com/en-us/ef/ef6/fundamentals/logging-and-interception?redirectedfrom=MSDN
            // https://stackoverflow.com/questions/1412863/how-do-i-view-the-sql-generated-by-the-entity-framework
        }



        #region private
        private void RevertChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(e => e.Entity != null).ToList())
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;  //Revert changes made to deleted entity.
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                }
            }
        }
        #endregion
    }

    public enum StoreType
    {
        Db,
        File,
        Output
    }
}
