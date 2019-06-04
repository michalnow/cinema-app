using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BaseAPI.Models
{
    public class Poster
    {
        [Key]
        public int posterID { get; set; }
        public string posterLink { get; set; }
        public int p_movieID { get; set; }
    }
}
