const Genre = require('../redis/genre');

const _manyGenres = function(result) {
  return result._results.map((r) => new Genre(r.get('genre')));
};

const getAll = function(session) {
  return session.query('MATCH (genre:Genre) RETURN genre').then(_manyGenres);
};

module.exports = {
  getAll
};
