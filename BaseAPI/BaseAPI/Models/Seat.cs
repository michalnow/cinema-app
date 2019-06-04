using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BaseAPI.Models
{
    public class Seat
    {
        [Key]
        public int seatID { get; set; }
        public int hall_movieID { get; set; }
        public int seatIsTaken { get; set; }
        public int seatNumber { get; set; }
    }
}
