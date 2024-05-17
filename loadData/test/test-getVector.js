'use strict'

const axios = require('axios');

function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function(key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}

async function run () {

  const res = await axios.get('http://localhost:8000/transform?text=toto')
  .then(response => {
    //console.log(response.data);
    //console.log(response.data.explanation);

    console.log("code:" + response.status);
    return response;
  })
  .catch(error => {
    console.log(error);
  });

  //console.log("res:" + stringify(res));

  
  if (res.status == 200) {
    const vectors = await res.data;
    console.log(vectors);
  } 

}

run().catch(console.log)





