const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Exporter la configuration
module.exports = {
  elasticsearchUrl: process.env.ELASTICSEARCH_URL,
  tmdbApiKey: process.env.TMDB_API_KEY,
  tmdbUrl : process.env.TMDB_URL,
  tmdbNbPage : process.env.TMDB_NB_PAGE,
  txt2VectorUrl: process.env.TXT_VEXTOR_URL,
  indexName: process.env.INDEX_NAME,
  libreTranslateUrl: process.env.LIBRE_TRANSLATE_URL
};