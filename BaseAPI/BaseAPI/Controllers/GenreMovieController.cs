using BaseAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Cors;

namespace BaseAPI.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/movie_genre")]
    [ApiController]
    public class GenreMovieController : ControllerBase
    {
        private DataBaseContext _context;
        public GenreMovieController(DataBaseContext webAPIDataContext)
        {
            _context = webAPIDataContext;
            _context.Database.EnsureCreated();
        }

        [HttpGet]
        public IQueryable<GenreMovie> GetClients()
        {
            return _context.movie_genre;
        }

        [HttpGet("{id}")]
        public IQueryable<GenreMovie> GetSingleClient(int id)
        {
            return _context.movie_genre.Where(x =>x.movie_genreID == id);
        }

        [HttpPost]
        public ActionResult<GenreMovie> PostClient(GenreMovie item)
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutClient(long id, GenreMovie item)
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
