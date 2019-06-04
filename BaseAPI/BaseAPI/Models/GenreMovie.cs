using System.ComponentModel.DataAnnotations;

namespace BaseAPI.Models
{
    public class GenreMovie
    {
        [Key]
        public int movie_genreID { get; set; }
        public int m_movieID { get; set; }
        public int g_genreID { get; set; }
    }
}
