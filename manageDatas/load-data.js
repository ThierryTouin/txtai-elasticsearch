'use strict'

const axios = require('axios');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const fs = require('fs').promises;


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

    // Lecture des données depuis data.json
    const data = await fs.readFile('./in/data.json', 'utf8');
    const movies = JSON.parse(data); // Conversion des données JSON en objet JavaScript


    movies.forEach(async movie => {
        
        console.log("title:" + movie.title);

        //var cumulField = movie.title + movie.genre + movie.release_year;
        var cumulField = movie.synopsis;

        var vectors = await getVector(cumulField);

        //console.log('vectors:' + vectors);

        /// insert data + vectors in elasticsearch
        await client.index({
            index: 'movies',
            body: {
                title: movie.title,
                synopsis: movie.synopsis,
                genre: movie.genre,
                release_year: movie.release_year,
                title_embedding: vectors
            }
          })



    });

  
  
  }


run().catch(console.log)