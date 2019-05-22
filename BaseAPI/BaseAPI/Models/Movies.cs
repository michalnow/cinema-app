﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace BaseAPI.Models
{
    public class Movies
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string releaseDate { get; set; }
        public string rating { get; set; }

        public List<Genre> genres { get; set; }
        public List<Trailer> trailers { get; set; }
        public List<Poster> posters { get; set; }
        public List<Roles> role { get; set; }

    }
}
