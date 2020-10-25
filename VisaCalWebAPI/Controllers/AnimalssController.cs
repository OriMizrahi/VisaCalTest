using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnimalssController : ControllerBase
    {
        private IAnimalsService _animalService;

        public AnimalssController(IAnimalsService animalService)
        {
            _animalService = animalService;
        }

        //[Authorize]
        [HttpGet("animals")]
        public IActionResult GetAll()
        {
            var animals = _animalService.GetAll();
            return Ok(animals);
        }
    }
}
