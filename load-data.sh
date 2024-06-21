#!/bin/bash
cd manageDatas
echo start createMoviesIndex.js script
node createMoviesIndex.js
echo start getMovies.js script
node getMovies.js
echo start putMovies.js script
node putMovies.js