# dotnet core api

## db migration
- open command prompt & execute commands
```
cd <Solution-Dir>
dotnet tool install --global dotnet-ef
dotnet tool update --global dotnet-ef
dotnet ef

# set database credentials in WebApp/AppSettings.json in connection string
# dotnet ef migrations add InitialCreate --project WebApp.Sql --startup-project WebApp
run->dotnet ef database update --project WebApp.Sql --startup-project WebApp
```
- open sln with visual studio & run
