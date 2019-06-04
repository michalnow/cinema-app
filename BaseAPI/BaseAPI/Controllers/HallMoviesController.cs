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
    [Route("api/seans")]
    [ApiController]
    public class HallMoviesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public HallMoviesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/HallMovies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HallMovieWIthSeats>>> Gethall_movie()
        {
            var seats = _context.seat.ToList();

            return await _context.hall_movie.Select(x=>x.Get(seats)).ToListAsync();
        }

        // GET: api/HallMovies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<HallMovieWIthSeats>>> GetHallMovie(int id)
        {
            var seats = _context.seat.ToList();

            return await _context.hall_movie.Where(x=>x.hall_movieID == id).Select(x => x.Get(seats)).ToListAsync();
        }

        // PUT: api/HallMovies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHallMovie(int id, HallMovie hallMovie)
        {
            if (id != hallMovie.hall_movieID)
            {
                return BadRequest();
            }

            _context.Entry(hallMovie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HallMovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HallMovies
        [HttpPost]
        public async Task<ActionResult<HallMovie>> PostHallMovie(HallMovie hallMovie)
        {
            _context.hall_movie.Add(hallMovie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHallMovie", new { id = hallMovie.hall_movieID }, hallMovie);
        }

        // DELETE: api/HallMovies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HallMovie>> DeleteHallMovie(int id)
        {
            var hallMovie = await _context.hall_movie.FindAsync(id);
            if (hallMovie == null)
            {
                return NotFound();
            }

            _context.hall_movie.Remove(hallMovie);
            await _context.SaveChangesAsync();

            return hallMovie;
        }

        private bool HallMovieExists(int id)
        {
            return _context.hall_movie.Any(e => e.hall_movieID == id);
        }
    }
}
