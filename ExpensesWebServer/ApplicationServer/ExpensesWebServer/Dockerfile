FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ExpensesWebServer.csproj", "./"]
RUN dotnet restore "ExpensesWebServer.csproj"
COPY . .
WORKDIR "/src/ExpensesWebServer"
RUN dotnet build "ExpensesWebServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ExpensesWebServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ExpensesWebServer.dll"]