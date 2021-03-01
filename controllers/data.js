// movies.js
const { writeResponse } = require('../helpers/response');
const dbUtils = require('../db/dbUtils');
const {
  ACTORS: { actors },
  DIRECTORS_OF_FILMS: { directors },
  GENRES: { genres },
  MOVIES: { movies },
  MOVIES_WITH_GENRES: { moviesWithGenres }
} = require('../data');

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
exports.setGenres = function(req, res, next) {
  const session = dbUtils.getSession();
  genres.forEach((genre) => {
    session.query('create (g:Genre{name:$genre}) ', genre)
      .catch(next);
  });
  writeResponse(res, `added ${genres.length} genres`);
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
exports.setMovies = function(req, res, next) {
  const session = dbUtils.getSession();

  movies.forEach((movie) => {
    for (const field in movie) {
      if (movie[field].low) movie[field] = movie[field].low;
    }
  });
  movies.forEach(({
    url, id, languages, title, countries, budget, duration, imdbId, imdbRating, imdbVotes,
    movieId, plot, poster, poster_image, released, revenue, runtime, tagline, tmdbId, year
  }) => {
    session.query('create (m:Movie {url: $url,'
      + 'id:$id, '
      + 'languages:$languages,'
      + ' title:$title,'
      + ' countries:$countries,'
      + ' budget:$budget, '
      + 'duration:$duration,'
      + ' imdbId:$imdbId, '
      + 'imdbRating:$imdbRating,'
      + ' imdbVotes:$imdbVotes, '
      + 'movieId:$movieId, '
      + 'plot:$plot, '
      + 'poster:$poster,'
      + ' poster_image:$poster_image, '
      + 'released:$released, '
      + 'revenue:$revenue,'
      + ' runtime:$runtime,'
      + ' tagline:$tagline, '
      + 'tmdbId:$tmdbId, '
      + 'year:$year})',
    {
      url,
      id,
      languages,
      title,
      countries,
      budget,
      duration,
      imdbId,
      imdbRating,
      imdbVotes,
      movieId,
      plot,
      poster,
      poster_image,
      released,
      revenue,
      runtime,
      tagline,
      tmdbId,
      year
    })
      .catch(next);
  });

  writeResponse(res, `added ${movies.length} movies`);
  // writeResponse(res, movies[0]);
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
exports.setDirectorsWithRelationshipToMovie = function(req, res, next) {
  const session = dbUtils.getSession();

  directors.forEach((director) => {
    const { born, died } = director.director.properties;

    director.director.properties.born = [];
    if (died) director.director.properties.died = [];

    for (const field in born) {
      if (born) {
        director.director.properties.born.push(born[field].low);
      }

      if (died) {
        director.director.properties.died.push(died[field].low);
      }
    }
  });
  directors.forEach(({
    director: {
      properties: {
        bio,
        born, bornIn, imdbId, name, poster, tmdbId, url
      }
    }, movieTitle
  }) => {
    session.query(
      'MATCH (m:Movie) '
      + 'WHERE m.title=$movieTitle '
      + 'CREATE (d:Director :Person'
      + '{'
      + 'bio:$bio,'
      + 'born:$born,'
      + 'bornIn:$bornIn,'
      + 'imdbId:$imdbId,'
      + 'name:$name,'
      + 'poster:$poster,'
      + 'tmdbId:$tmdbId,'
      + 'url:$url'
      + '}'
      + ')-[r:DIRECTED]->(m)', {
        bio,
        born,
        bornIn,
        imdbId,
        name,
        poster,
        tmdbId,
        url,
        movieTitle
      }
    )
      .catch(next);
  });

  writeResponse(res, `added ${directors.length} directors with relations [DIRECTED] to their movies`);
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
exports.setActorsWithRelationshipToMovie = function(req, res, next) {
  const session = dbUtils.getSession();

  actors.forEach((actor) => {
    const { born, died } = actor.actor.properties;

    actor.actor.properties.born = [];
    if (died) actor.actor.properties.died = [];

    for (const field in born) {
      if (born) {
        actor.actor.properties.born.push(born[field].low);
      }

      if (died) {
        actor.actor.properties.died.push(died[field].low);
      }
    }
  });

  actors.forEach(({
    actor: {
      properties: {
        bio, born, bornIn, died, imdbId, name, poster, tmdbId, url
      }
    }, movieTitle, role
  }) => {
    session.query(
      'MATCH (m:Movie) '
      + 'WHERE m.title=$movieTitle '
      + 'CREATE (a:Actor :Person'
      + '{'
      + 'bio:$bio,'
      + 'born:$born,'
      + 'bornIn:$bornIn,'
      + 'died:$died,'
      + 'imdbId:$imdbId,'
      + 'name:$name,'
      + 'poster:$poster,'
      + 'tmdbId:$tmdbId,'
      + 'url:$url'
      + '}'
      + ')-[r:ACTED_IN_MOVIE {role: $role}]->(m)', {
        bio,
        born,
        bornIn,
        died,
        imdbId,
        name,
        poster,
        tmdbId,
        url,
        movieTitle,
        role
      }
    )
      .catch(next);
  });

  writeResponse(res, `added ${actors.length} actors with relations [ACTED_IN_MOVIE] to their movies`);
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
exports.setGenresToMovies = function(req, res, next) {
  const session = dbUtils.getSession();

  moviesWithGenres.forEach(({ genre, movieTitle }) => {
    session.query('MATCH (g:Genre), (m:Movie)\n'
      + 'WHERE g.name = $genre AND m.title = $movieTitle\n'
      + 'CREATE (m)-[:IN_GENRE]->(g)\n',
    {
      genre, movieTitle
    })
      .catch(next);
  });

  writeResponse(res, `added ${moviesWithGenres.length} relationships between movies and genres`);
  // writeResponse(res, movies[0]);
};
