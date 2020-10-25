using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VisaCalWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private IAnimalsService _animalsService;

        public AnimalsController(IAnimalsService animalsService)
        {
            _animalsService = animalsService;
        }

        // GET: api/<ValuesController>
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var animals = _animalsService.GetAll();
            return Ok(animals.Result);
        }

        // GET api/<ValuesController>/5
        [Authorize]
        [HttpGet("{id}")]
        public string Get(string name)
        {
            return "value";
        }

        // POST api/<AnimalsController>
        //[Authorize]
        //[HttpPost("{animal}")]
        //public void Post([FromBody] Animal animal)
        //{
        //    _animalsService.UpdateAnimelCatlog(animal);
        //}

        //[Authorize]
        //[HttpPost("UpdateAnimelCatlog")]
        //public IActionResult Authenticate(string animal)
        //{
        //    var response = _animalsService.UpdateAnimelCatlog(animal);

        //    if (response == null)
        //        return BadRequest();

        //    return Ok(response);
        //}

        // PUT api/<AnimalsController>/5
        [Authorize]
        //[HttpPut("{animal}")]
        [HttpPut()]
        public async Task<IActionResult> Put(string name, [FromBody] Animal animal)
        {
            return Ok(_animalsService.UpdateAnimelCatlog(animal));
        }

        // DELETE api/<ValuesController>/5
        [Authorize]
        [HttpDelete("{name}")]
        public void Delete(string name)
        {
        }
    }
}
