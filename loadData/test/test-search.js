'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {

  // Let's search!
  const { hits } = await client.search({
    index: 'movies',
    body: {
      query: {
        "match_all": {}
      }
    }
  })

  console.log(hits)
}

run().catch(console.log)