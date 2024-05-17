'use strict'

const axios = require('axios');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

const movies = [
    {"title": "Inception", "genre": "Sci-Fi", "release_year": 2010},
    {"title": "The Shawshank Redemption", "genre": "Drama", "release_year": 1994},
    {"title": "The Godfather", "genre": "Crime", "release_year": 1972},
    {"title": "Pulp Fiction", "genre": "Crime", "release_year": 1994},
    {"title": "Forrest Gump", "genre": "Drama", "release_year": 1994}
];

// a factoriser
async function getVector (str) {
    const res = await axios.get('http://localhost:8000/transform?text='+str)
    .then(response => {
      console.log("code:" + response.status);
      return response;
    })
    .catch(error => {
      console.log(error);
    });

    if (res.status == 200) {
      const vectors = await res.data;
      console.log(vectors);
      return vectors;
    } 
}

async function run () {

    movies.forEach(async movie => {
        
        console.log("title:" + movie.title);

        var cumulField = movie.title + movie.genre + movie.release_year;

        var vectors = await getVector(cumulField);

        //console.log('vectors:' + vectors);

        /// insert data + vectors in elasticsearch
        await client.index({
            index: 'movies',
            body: {
                title: movie.title,
                genre: movie.genre,
                release_year: movie.release_year,
                title_embedding: vectors
            }
          })



    });

  
  
  }


run().catch(console.log)