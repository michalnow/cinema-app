using BaseAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Cors;

namespace BaseAPI.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/movie")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private DataBaseContext _context;
        public MovieController(DataBaseContext webAPIDataContext)
        {
            _context = webAPIDataContext;
            _context.Database.EnsureCreated();
        }

        [HttpGet]
        public IQueryable<Movie> GetClients()
        {
            return _context.movie;
        }

        [HttpGet("{id}")]
        public IQueryable<Movie> GetSingleClient(int id)
        {
            return _context.movie.Where(x =>x.movieID == id);
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
