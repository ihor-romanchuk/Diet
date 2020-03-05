using Microsoft.EntityFrameworkCore.Migrations;

namespace Diet.Database.Migrations
{
    public partial class V110 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Calories",
                table: "Meals",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Calories",
                table: "Meals",
                type: "float",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
