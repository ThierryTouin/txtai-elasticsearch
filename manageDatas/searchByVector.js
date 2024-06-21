'use strict'

const { Client } = require('@elastic/elasticsearch')

const config = require('./load-config');


const client = new Client({ node: config.elasticsearchUrl });
const indexName = config.indexName;
const libreTranslateUrl = config.libreTranslateUrl;

const axios = require('axios');



async function translate (text, sourceLang, targetLang) {

  const requestBody = {
    q: text,
    source: sourceLang,
    target: targetLang
  };

  const res = await axios.post(libreTranslateUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  .then(response => {
    console.log("code:" + response.status);
    return response;
  })
  .catch(error => {
    console.error('Erreur lors de la traduction:', error.response ? error.response.data : error.message);
    throw error;
  });

  if (res.status == 200) {
    const trad = await res.data;
    return trad;
  } 
}


async function getVector (str) {
  const res = await axios.get(config.txt2VectorUrl+str)
  .then(response => {
    console.log("code:" + response.status);
    return response;
  })
  .catch(error => {
    console.log(error);
  });

  if (res.status == 200) {
    const vectors = await res.data;
    //console.log(vectors);
    return vectors;
  } 
}


async function run (sourceLang, targetLang, req) {

  const reqInEN = await translate(reqSrc, sourceLang, targetLang);
  //console.log("In english :'" + JSON.stringify(reqInEN) +"'");
  console.log("In english :'" + reqInEN.translatedText +"'");

  var vectors = await getVector(req);
  
  // Let's search!
  const { hits } = await client.search({
    index: indexName,

    body: {
      knn: {
        field: "title_embedding",
        query_vector: vectors,
        k: 2, 
        "num_candidates": 10
      }
    }
  })

  //console.log(hits)

  for (const hit of hits.hits) {

    console.log("===============================");

    var titleEN = hit._source.title;
    var synopsisEN = hit._source.synopsis;
    console.log(titleEN);
    console.log(synopsisEN);

    var titleTrad = await translate(titleEN, targetLang, sourceLang);
    var synopsisTrad = await translate(synopsisEN, targetLang, sourceLang);

    console.log(titleTrad.translatedText);
    console.log(synopsisTrad.translatedText);


  }




}

var reqSrc = process.argv[2];
console.log("Start search with requete='" + reqSrc +"'");
var sourceLang = "fr";
const targetLang = "en";

run(sourceLang,targetLang,reqSrc)
  .catch(console.log);

