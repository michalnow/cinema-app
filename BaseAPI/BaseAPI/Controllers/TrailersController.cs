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
    public class TrailersController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public TrailersController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Trailers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trailer>>> GetTrailer()
        {
            return await _context.trailer.ToListAsync();
        }

        // GET: api/Trailers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trailer>> GetTrailer(int id)
        {
            var trailer = await _context.trailer.FindAsync(id);

            if (trailer == null)
            {
                return NotFound();
            }

            return trailer;
        }

        // PUT: api/Trailers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrailer(int id, Trailer trailer)
        {
            if (id != trailer.trailerID)
            {
                return BadRequest();
            }

            _context.Entry(trailer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrailerExists(id))
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

        // POST: api/Trailers
        [HttpPost]
        public async Task<ActionResult<Trailer>> PostTrailer(Trailer trailer)
        {
            _context.trailer.Add(trailer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrailer", new { id = trailer.trailerID }, trailer);
        }

        // DELETE: api/Trailers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Trailer>> DeleteTrailer(int id)
        {
            var trailer = await _context.trailer.FindAsync(id);
            if (trailer == null)
            {
                return NotFound();
            }

            _context.trailer.Remove(trailer);
            await _context.SaveChangesAsync();

            return trailer;
        }

        private bool TrailerExists(int id)
        {
            return _context.trailer.Any(e => e.trailerID == id);
        }
    }
}
