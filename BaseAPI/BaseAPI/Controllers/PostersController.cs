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
    [Route("api/[controller]")]
    [ApiController]
    public class PostersController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public PostersController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Posters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Poster>>> GetPoster()
        {
            return await _context.poster.ToListAsync();
        }

        // GET: api/Posters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Poster>> GetPoster(int id)
        {
            var poster = await _context.poster.FindAsync(id);

            if (poster == null)
            {
                return NotFound();
            }

            return poster;
        }

        // PUT: api/Posters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPoster(int id, Poster poster)
        {
            if (id != poster.posterID)
            {
                return BadRequest();
            }

            _context.Entry(poster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PosterExists(id))
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

        // POST: api/Posters
        [HttpPost]
        public async Task<ActionResult<Poster>> PostPoster(Poster poster)
        {
            _context.poster.Add(poster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPoster", new { id = poster.posterID }, poster);
        }

        // DELETE: api/Posters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Poster>> DeletePoster(int id)
        {
            var poster = await _context.poster.FindAsync(id);
            if (poster == null)
            {
                return NotFound();
            }

            _context.poster.Remove(poster);
            await _context.SaveChangesAsync();

            return poster;
        }

        private bool PosterExists(int id)
        {
            return _context.poster.Any(e => e.posterID == id);
        }
    }
}
