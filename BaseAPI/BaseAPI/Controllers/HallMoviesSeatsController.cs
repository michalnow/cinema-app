using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BaseAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace BaseAPI.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/seatbooked")]
    [ApiController]
    public class HallMoviesSeatsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public HallMoviesSeatsController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/HallMovies/5

        [HttpGet("{id}")]
        public List<int> GetHallMovie(int id)
        {
            var seats = _context.seat.ToList();

          var hall_movies =  _context.hall_movie.Where(x=>x.hall_movieID == id).Select(x => x.Get(seats)).FirstOrDefault();

          return hall_movies.seatsBooked.Select(x => x.seatNumber).ToList();
        }
    }
}
