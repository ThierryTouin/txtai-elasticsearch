const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');

// Charge les variables d'environnement à partir du fichier .env
dotenv.config();

// Récupère la clé API à partir des variables d'environnement
const apiKey = process.env.TMDB_API_KEY;
const nbPage = 30;


// Fonction pour récupérer les données des films d'une page spécifique
const getMoviesDataFromPage = async (page) => {
  const params = {
    api_key: apiKey,
    language: 'en-US',
    page,
    // Nombre de films à récupérer par page 
    limit: 50
  };

  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', { params });
    return response.data.results;
  } catch (error) {
    console.error(`Erreur lors de la récupération des données de la page ${page} :`, error.message);
    return [];
  }
};

// Fonction pour récupérer les données des films de toutes les pages
const getAllMoviesData = async () => {
  const moviesData = [];

  for (let page = 1; page <= nbPage; page++) {
    console.log(`Récupération des données de la page ${page}...`);
    const movies = await getMoviesDataFromPage(page);
    moviesData.push(...movies);
  }

  return moviesData;
};

// Fonction pour extraire les informations souhaitées et écrire le fichier data.json
const writeDataJson = async () => {
  try {
    const moviesData = await getAllMoviesData();
    const moviesInfo = [];

    for (const movie of moviesData) {
      const { id, title, release_date, genre_ids } = movie;
      const [year] = release_date.split('-');

      // Récupération du synopsis et des genres
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, { params: { api_key: apiKey, language: 'en-US' } });
      const { overview: synopsis, genres } = movieResponse.data;

      // Mappage des genres
      const movieGenres = genres.map(genre => genre.name);

      // Ajout des données du film au tableau
      moviesInfo.push({
        title,
        synopsis,
        genre: movieGenres.join(', '),
        release_year: year
      });
    }

    // Écriture des données dans le fichier data.json
    fs.writeFileSync('./in/data.json', JSON.stringify(moviesInfo, null, 2));
    console.log('Données enregistrées dans data.json');
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error.message);
  }
};

// Vérifie si la clé API est définie
if (!apiKey) {
  console.error('La clé API n\'est pas définie dans le fichier .env');
} else {
  writeDataJson();
}
