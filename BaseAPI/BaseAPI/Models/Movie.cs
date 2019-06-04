using BaseAPI.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace BaseAPI.Models
{
    public class Movie
    {
        [Key]
        public int movieID { get; set; }
        public string movieTitle { get; set; }
        public string movieDesc { get; set; }
        public DateTime movieReleaseDate { get; set; }
        public string movieRating { get; set; }
        public int duration { get; set; }

        public Movies Get(DataSource data)
        {
            var helper = data.genreMovies.Where(x => x.m_movieID == this.movieID).ToList();
            var genres = data.genre.Where(x => helper.Select(y => y.g_genreID).Contains(x.genreID)).ToList();
            var trailers = data.trailer.Where(x => x.t_movieID == this.movieID).ToList();
            var posters = data.poster.Where(x => x.p_movieID == this.movieID).ToList();
            var role = data.role.Where(x => x.movieID == this.movieID).ToList();
            var seanse = data.seanse.Where(x => x.movieID == this.movieID).ToList();

            return new Movies
            {
                id = this.movieID,
                title = this.movieTitle,
                description = this.movieDesc,
                releaseDate = this.movieReleaseDate,
                rating = this.movieRating,
                genres = genres,
                trailers = trailers,
                posters = posters,
                role = role,
                seanse = seanse,
                duration =  this.duration
            };
        }
    }
}
