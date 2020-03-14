using AutoMapper;
using Diet.Core.Dtos;
using Diet.Database.Entities;

namespace Diet.SPA
{
    /// <summary>
    /// Mapping configurations for AutoMapper.
    /// </summary>
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<MealEntity, MealDto>().ReverseMap();
            CreateMap<ApplicationUserEntity, UserDto>().ReverseMap();
            CreateMap<SettingEntity, SettingDto>().ReverseMap();
        }
    }
}
