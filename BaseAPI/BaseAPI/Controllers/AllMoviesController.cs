using BaseAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using BaseAPI.Data;
using Microsoft.AspNetCore.Cors;

namespace BaseAPI.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/movies")]
    [ApiController]
    public class AllMoviesController : ControllerBase
    {
        private DataBaseContext _context;
        public AllMoviesController(DataBaseContext webAPIDataContext)
        {
            _context = webAPIDataContext;
                _context.Database.EnsureCreated();
        }

        [HttpGet]
        public IQueryable<Movies> GetAllMovies(string search)
        {            
            var persons = _context.person.ToList();


            var seats = _context.seat.ToList();

            
            var result = new DataSource()
            {
                genreMovies = _context.movie_genre.ToList(),
                genre = _context.genre.ToList(),
                trailer = _context.trailer.ToList(),
                poster = _context.poster.ToList(),
                role = _context.role.Select(x=>x.Get(persons)).ToList(),
                seanse =  _context.hall_movie.Select(x => x.Get(seats)).ToList()

        };

            if (search != null)
                return _context.movie.Where(x=>x.movieTitle.Contains(search)).Select(x => x.Get(result));
            else
                return _context.movie.Select(x => x.Get(result));
        }

        [HttpGet("{id}")]
        public IQueryable<Movies> GetAllMoviesId(int id)
        {
            var persons = _context.person.ToList();
            var seats = _context.seat.ToList();

            var result = new DataSource()
            {
                genreMovies = _context.movie_genre.ToList(),
                genre = _context.genre.ToList(),
                trailer = _context.trailer.ToList(),
                poster = _context.poster.ToList(),
                role = _context.role.Select(x => x.Get(persons)).ToList(),
                seanse = _context.hall_movie.Select(x => x.Get(seats)).ToList()
            };

            return _context.movie.Where(x=>x.movieID == id).Select(x => x.Get(result));
        }
    }
}
