using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BaseAPI.Models
{
    public class Hall
    {
        [Key]
        public int hallID { get; set; }
        public string hallTitle { get; set; }
        public string hallDesc { get; set; }
        public int hallMaxDesc { get; set; }
    }
}
