using System.ComponentModel.DataAnnotations;

namespace BaseAPI.Models
{
    public class Genre
    {
        [Key]
        public int genreID { get; set; }
        public string genreType { get; set; }
        public string genreDesc { get; set; }
    }
}
