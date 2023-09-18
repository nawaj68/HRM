using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Sql.Migrations
{
    public partial class addGenderReligion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "MaritalStatusId",
                table: "UserInformations",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserInformations_MaritalStatusId",
                table: "UserInformations",
                column: "MaritalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_UserInformations_ReligionId",
                table: "UserInformations",
                column: "ReligionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInformations_MaritalStatuses_MaritalStatusId",
                table: "UserInformations",
                column: "MaritalStatusId",
                principalTable: "MaritalStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserInformations_Religions_ReligionId",
                table: "UserInformations",
                column: "ReligionId",
                principalTable: "Religions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInformations_MaritalStatuses_MaritalStatusId",
                table: "UserInformations");

            migrationBuilder.DropForeignKey(
                name: "FK_UserInformations_Religions_ReligionId",
                table: "UserInformations");

            migrationBuilder.DropIndex(
                name: "IX_UserInformations_MaritalStatusId",
                table: "UserInformations");

            migrationBuilder.DropIndex(
                name: "IX_UserInformations_ReligionId",
                table: "UserInformations");

            migrationBuilder.DropColumn(
                name: "MaritalStatusId",
                table: "UserInformations");
        }
    }
}
