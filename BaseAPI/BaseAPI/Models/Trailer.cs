using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BaseAPI.Models
{
    public class Trailer
    {
        [Key]
        public int trailerID { get; set; }
        public string trailerURL { get; set; }
        public int t_movieID { get; set; }
    }
}
