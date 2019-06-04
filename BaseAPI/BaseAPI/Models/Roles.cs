using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BaseAPI.Models
{
    public class Roles
    {
        public int roleID { get; set; }
        public string roleDesc { get; set; }
        public int movieID { get; set; }

        public Person personInformation { get; set; }
    }
}
