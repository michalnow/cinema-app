using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace BaseAPI.Models
{
    public class HallMovie
    {
        [Key]
        public int hall_movieID { get; set; }
        public int h_hallID { get; set; }
        public int m_movieID { get; set; }
        public string hallSeanceDate { get; set; }

        public HallMovieWIthSeats Get(List<Seat> seats)
        {
            var seatsHere = seats.Where(x => x.hall_movieID == this.hall_movieID).ToList();
            return new HallMovieWIthSeats
            {
                hall_movieID = this.hall_movieID,
                hallID = this.h_hallID,
                movieID = this.m_movieID,
                seanceDate = this.hallSeanceDate,
                seatsBooked = seatsHere

            };
        }
    }
}
