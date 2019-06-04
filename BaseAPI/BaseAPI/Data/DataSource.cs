using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BaseAPI.Models;

namespace BaseAPI.Data
{
    public class DataSource
    {
        public List<GenreMovie> genreMovies { get; set; }
        public List<Genre> genre { get; set; }
        public List<Trailer> trailer { get; set; }
        public List<Poster> poster { get; set; }
        public List<Roles> role { get; set; }
        public List<HallMovieWIthSeats> seanse { get; set; }
    }
}
