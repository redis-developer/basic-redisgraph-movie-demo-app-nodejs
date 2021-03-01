const { Router } = require('express');
const { movies } = require('../controllers');

const moviesRouter = Router();

moviesRouter.get('/', movies.list);
moviesRouter.get('/recommended', movies.getRecommendedMovies);
moviesRouter.get('/rated', movies.findMoviesRatedByMe);
moviesRouter.get('/:id', movies.findById);
moviesRouter.get('/genre/:id', movies.findByGenre);
moviesRouter.get('/daterange/:start/:end', movies.findMoviesByDateRange);
moviesRouter.get('/directed_by/:id', movies.findMoviesByDirector);
moviesRouter.get('/acted_in_by/:id', movies.findMoviesByActor);
moviesRouter.get('/written_by/:id', movies.findMoviesByWriter);
moviesRouter.post('/:id/rate', movies.rateMovie);
moviesRouter.delete('/:id/rate', movies.deleteMovieRating);

module.exports = moviesRouter;
