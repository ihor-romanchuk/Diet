using AutoMapper;
using Diet.Core.Dtos;
using Diet.Database.Entities;

namespace Diet.SPA
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<MealEntity, MealDto>().ReverseMap();
        }
    }
}
