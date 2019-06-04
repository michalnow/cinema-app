using BaseAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Cors;

namespace BaseAPI.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/genre")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private DataBaseContext _context;
        public GenreController(DataBaseContext webAPIDataContext)
        {
            _context = webAPIDataContext;
            _context.Database.EnsureCreated();
        }

        [HttpGet]
        public IQueryable<Genre> GetClients()
        {
            return _context.genre;
        }

        [HttpGet("{id}")]
        public IQueryable<Genre> GetSingleClient(int id)
        {
            return _context.genre.Where(x =>x.genreID == id);
        }

        [HttpPost]
        public ActionResult<Genre> PostClient(Genre item)
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutClient(long id, Genre item)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteClient(long id)
        {
            return Ok();
        }
    }
}
