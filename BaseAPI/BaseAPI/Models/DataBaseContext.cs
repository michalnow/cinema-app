using Microsoft.EntityFrameworkCore;
using BaseAPI.Models;

namespace BaseAPI.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<Genre> genre { get; set; }
        public DbSet<Movie> movie { get; set; }
        public DbSet<GenreMovie> movie_genre { get; set; }
        public DbSet<Trailer> trailer { get; set; }
        public DbSet<Role> role { get; set; }
        public DbSet<Poster> poster { get; set; }
        public DbSet<Person> person { get; set; }

        public DbSet<Seat> seat { get; set; }
        public DbSet<Hall> hall { get; set; }
        public DbSet<HallMovie> hall_movie { get; set; }

    }
}
