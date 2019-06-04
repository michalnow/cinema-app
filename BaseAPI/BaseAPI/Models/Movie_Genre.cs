using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaseAPI.Models
{
    public class Movie_Genre
    {
        public int movie_genreID { get; set; }

        public int m_movieID { get; set; }
        public virtual Movie movie { get; set; }


        public int g_genreID { get; set; }
        public virtual Genre genre { get; set; }
    }
}
