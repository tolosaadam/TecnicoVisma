#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["TecnicoVismaAPI/TecnicoVismaAPI.csproj", "TecnicoVismaAPI/"]

COPY ["TecnicoVisma.Business/TecnicoVisma.Business.csproj", "TecnicoVisma.Business/"]

COPY ["TecnicoVisma.Entities/TecnicoVisma.Entities.csproj", "TecnicoVisma.Entities/"]

COPY ["TecnicoVisma.Interfaces/TecnicoVisma.Interfaces.csproj", "TecnicoVisma.Interfaces/"]

COPY ["TecnicoVisma.MapperProfiles/TecnicoVisma.MapperProfiles.csproj", "TecnicoVisma.MapperProfiles/"]

COPY ["TecnicoVisma.Repositories/TecnicoVisma.Repositories.csproj", "TecnicoVisma.Repositories/"]

COPY ["TecnicoVisma.JWTAuthenticationManager/TecnicoVisma.JWTAuthenticationManager.csproj", "TecnicoVisma.JWTAuthenticationManager/"]

RUN dotnet restore "TecnicoVismaAPI/TecnicoVismaAPI.csproj"
COPY . .
WORKDIR "/src/TecnicoVismaAPI"
RUN dotnet build "TecnicoVismaAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TecnicoVismaAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TecnicoVismaAPI.dll"]