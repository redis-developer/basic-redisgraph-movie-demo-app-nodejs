// movies.js
const {writeResponse} = require('../helpers/response');
const {
  ACTORS: {actors},
  DIRECTORS_OF_FILMS: {directors},
  GENRES: {genres},
  MOVIES: {movies},
  MOVIES_WITH_GENRES: {moviesWithGenres},
} = require('../data');

const {
  addGenres,
  setMovies,
  setDirectorsWithRelationshipToMovie,
  setActorsWithRelationshipToMovie,
  setGenresToMovies,
} = require('../db/initialize');

/**
 * @swagger
 * /data/genres:
 *   post:
 *     tags:
 *     - data
 *     description: Set 20 genres
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "added 20 genres"
 */
exports.setGenres = async function (_, res, next) {
  try {
    await addGenres();
    writeResponse(res, `added ${genres.length} genres`);
  } catch (e) {
    next(e);
  }
};
/**
 * @swagger
 * /data/movies:
 *   post:
 *     tags:
 *     - data
 *     description: Set 50 movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "added 50 movies"
 */
exports.setMovies = async function (_, res, next) {
  try {
    await setMovies();
    writeResponse(res, `added ${movies.length} movies`);
  } catch (e) {
    next(e);
  }
};
/**
 * @swagger
 * /data/directors:
 *   post:
 *     tags:
 *     - data
 *     description: Set directors and their relations to movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "added 54 directors with relations [DIRECTED] to their movies"
 */
exports.setDirectorsWithRelationshipToMovie = async function (_, res, next) {
  try {
    await setDirectorsWithRelationshipToMovie();
    writeResponse(
      res,
      `added ${directors.length} directors with relations [DIRECTED] to their movies`,
    );
  } catch (e) {
    next(e);
  }
};
/**
 * @swagger
 * /data/actors:
 *   post:
 *     tags:
 *     - data
 *     description: Set actors and their relations to movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "added 192 actors with relations [ACTED_IN_MOVIE] to their movies"
 */
exports.setActorsWithRelationshipToMovie = async function (_, res, next) {
  try {
    await setActorsWithRelationshipToMovie();
    writeResponse(
      res,
      `added ${actors.length} actors with relations [ACTED_IN_MOVIE] to their movies`,
    );
  } catch (e) {
    next(e);
  }
};
/**
 * @swagger
 * /data/movies_genres:
 *   post:
 *     tags:
 *     - data
 *     description: Set genres  relations to movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "added 115 relationships between movies and genres"
 */
exports.setGenresToMovies = async function (_, res, next) {
  try {
    await setGenresToMovies();
    writeResponse(
      res,
      `added ${moviesWithGenres.length} relationships between movies and genres`,
    );
  } catch (e) {
    next(e);
  }
};
