const { Router } = require('express');
const { data } = require('../controllers');

const dataRouter = Router();

dataRouter.post('/movies', data.setMovies);
dataRouter.post('/genres', data.setGenres);
dataRouter.post('/movies_genres', data.setGenresToMovies);
dataRouter.post('/actors', data.setActorsWithRelationshipToMovie);
dataRouter.post('/directors', data.setDirectorsWithRelationshipToMovie);

module.exports = dataRouter;
