const _ = require('lodash');
const Movie = require('../redis/movie');
const Person = require('../redis/person');
const Genre = require('../redis/genre');

const _singleMovieWithDetails = function(movie) {
  if (movie._values.length) {
    const result = {};
    _.extend(result, new Movie(movie.get('movie'), movie.get('my_rating')));

    result.directors = _.map(movie.get('directors'), (record) => new Person(record));
    result.genres = _.map(movie.get('genres'), (record) => new Genre(record));
    result.producers = _.map(movie.get('producers'), (record) => new Person(record));
    result.writers = _.map(movie.get('writers'), (record) => new Person(record));
    result.actors = _.map(movie.get('actors'), (record) => record);
    result.related = _.map(movie.get('related'), (record) => new Movie(record));
    return result;
  }
  return null;
};

/**
 *  Query Functions
 */

function manyMovies(listOfMovies) {
  return listOfMovies._results.map((r) => new Movie(r.get('movie')));
}

// get all movies
const getAll = function(session) {
  return session.query('MATCH (movie:Movie) RETURN movie')
    .then((r) => manyMovies(r));
};

// get a single movie by id
const getById = function(session, movieId, userId) {
  const query = ['MATCH (movie:Movie {tmdbId: $movieId})\n'
    + '  OPTIONAL MATCH (movie)<-[my_rated:RATED]-(me:User {id: $userId})\n'
    + '  OPTIONAL MATCH (movie)<-[r:ACTED_IN_MOVIE]-(a:Actor)\n'
    + '  OPTIONAL MATCH (movie)-[:IN_GENRE]->(genre:Genre)\n'
    + '  OPTIONAL MATCH (movie)<-[:DIRECTED]-(d:Director)\n'
    + '  WITH DISTINCT movie, my_rated, genre, d,  a, r\n'
    + '  RETURN DISTINCT movie,\n'
    + '  collect(DISTINCT d) AS directors,\n'
    + '  collect(DISTINCT a) AS actors,\n'
    + '  collect(DISTINCT genre) AS genres'].join(' ');
  return session.query(query, {
    movieId: movieId.toString(),
    userId: userId.toString()
  })
    .then((result) => {
      if (result.hasNext()) {
        return _singleMovieWithDetails(result.next());
      }
      throw { message: 'movie not found', status: 404 };
    });
};

// Get by date range
const getByDateRange = function(session, start, end) {
  const query = [
    'MATCH (movie:Movie)',
    'WHERE movie.released > $start AND movie.released < $end',
    'RETURN movie'
  ].join('\n');

  return session.query(query, {
    start: parseInt(start || 0, 10),
    end: parseInt(end || 0, 10)
  })
    .then((result) => manyMovies(result.next()));
};

// Get by date range
const getByActor = function(session, id) {
  const query = ['MATCH (actor:Actor {tmdbId: $id})-[:ACTED_IN_MOVIE]->(movie:Movie)', 'RETURN DISTINCT movie'].join('\n');

  return session.query(query, {
    id
  }).then((result) => manyMovies(result));
};

// get a movie by genre
const getByGenre = function(session, genreId) {
  const query = [
    'MATCH (movie:Movie)-[:IN_GENRE]->(genre)',
    'WHERE toLower(genre.name) = toLower($genreId) OR id(genre) = toInteger($genreId)',
    'RETURN movie'
  ].join('\n');

  return session.query(query, {
    genreId
  }).then((result) => manyMovies(result));
};

// Get many movies directed by a person
const getByDirector = function(session, personId) {
  const query = ['MATCH (:Director {tmdbId: $personId})-[:DIRECTED]->(movie:Movie)', 'RETURN DISTINCT movie'].join('\n');

  return session.query(query, {
    personId
  }).then((result) => manyMovies(result));
};

// Get many movies written by a person
const getByWriter = function(session, personId) {
  const query = ['MATCH (:Writer {tmdbId: $personId})-[:WRITER_OF]->(movie:Movie)', 'RETURN DISTINCT movie'].join('\n');

  return session.query(query, {
    personId
  }).then((result) => manyMovies(result));
};

const rate = function(session, movieId, userId, rating) {
  return session.query(
    'MATCH (u:User {id: $userId}),(m:Movie {tmdbId: $movieId}) \
      MERGE (u)-[r:RATED]->(m) \
      SET r.rating = $rating \
      RETURN m',
    {
      userId,
      movieId,
      rating: parseInt(rating, 10)
    }
  );
};

const deleteRating = function(session, movieId, userId) {
  return session.query(
    'MATCH (u:User {id: $userId})-[r:RATED]->(m:Movie {tmdbId: $movieId}) DELETE r',
    { userId, movieId }
  );
};

const getRatedByUser = function(session, userId) {
  return session.query(
    'MATCH (:User {id: $userId})-[rated:RATED]->(movie:Movie) \
       RETURN DISTINCT movie, rated.rating as my_rating',
    { userId }
  ).then((result) => result._results.map((r) => new Movie(r.get('movie'), r.get('my_rating'))));
};

const getRecommended = function(session, userId) {
  return session.query(
    'MATCH (me:User {id: $userId})-[my:RATED]->(m:Movie) \
    MATCH (other:User)-[their:RATED]->(m) \
      WHERE me <> other \
      AND abs(my.rating - their.rating) < 2 \
      WITH other,m \
      MATCH (other)-[otherRating:RATED]->(movie:Movie) \
      WHERE movie <> m \
      WITH avg(otherRating.rating) AS avgRating, movie \
      RETURN movie \
      ORDER BY avgRating desc \
      LIMIT 25',
    { userId }
  ).then((result) => manyMovies(result));
};

// export exposed functions
module.exports = {
  getAll,
  getById,
  getByDateRange,
  getByActor,
  getByGenre,
  getMoviesbyDirector: getByDirector,
  getMoviesByWriter: getByWriter,
  rate,
  deleteRating,
  getRatedByUser,
  getRecommended
};
