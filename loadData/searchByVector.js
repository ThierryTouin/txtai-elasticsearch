'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const axios = require('axios');

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


  //var vectors = await getVector("forgive");
  //var vectors = await getVector("parents");
  //var vectors = await getVector("who can do the math?");
  var vectors = await getVector("a topic about revolts?");
  

  
  // Let's search!
  const { hits } = await client.search({
    index: 'movies',

    body: {
      knn: {
        field: "title_embedding",
        query_vector: vectors,
        k: 2, 
        "num_candidates": 10
      }
    }
  })

  console.log(hits)

  hits.hits.forEach(hit => {

    console.log(hit._source.title);

  })

}

run().catch(console.log)