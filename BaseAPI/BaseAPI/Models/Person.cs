using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BaseAPI.Models
{
    public class Person
    {
        [Key]
        public int personID { get; set; }
        public string personFirstName { get; set; }
        public string personLastName { get; set; }
        public string personPicture { get; set; }

    }
}
