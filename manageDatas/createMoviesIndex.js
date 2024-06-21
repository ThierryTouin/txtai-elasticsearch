const { Client } = require('@elastic/elasticsearch');
const config = require('./load-config');


const client = new Client({ node: config.elasticsearchUrl });

async function createIndex() {
  const indexName = config.indexName;

  // Suppression de l'index s'il existe
  try {
    const exists = await client.indices.exists({ index: indexName });
    console.log(`Index '${indexName}' found : ${exists}`);
    if (exists) {
      await client.indices.delete({ index: indexName });
      console.log(`Index '${indexName}' supprimé avec succès.`);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'index:', error);
  }

  // Création de l'index avec le mapping spécifié
  try {
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            title: {
              type: 'text'
            },
            synopsis: {
              type: 'text'
            },
            genre: {
              type: 'keyword'
            },
            release_year: {
              type: 'integer'
            },
            title_embedding: {
              type: 'dense_vector',
              dims: 384
            }
          }
        }
      }
    });
    console.log(`Index '${indexName}' créé avec succès.`);
  } catch (error) {
    console.error('Erreur lors de la création de l\'index:', error);
  }
}

createIndex();
