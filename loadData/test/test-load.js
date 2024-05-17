'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'movies',
    body: {
        title: 'Inception',
        genre: 'Sci-Fi',
        release_year: 2010
    }
  })

  await client.index({
    index: 'movies',
    body: {
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        release_year: 1994
    }
  })


}

run().catch(console.log)