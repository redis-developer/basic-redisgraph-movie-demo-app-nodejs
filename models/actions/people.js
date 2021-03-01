const User = require('../redis/user');

// return many people
function _manyPeople(listOfPersons) {
  return listOfPersons._results.map((r) => new User(r.get('user')));
}

// get a single person by id
const getById = function(session, id) {
  const query = ['MATCH (user:User {id: $id})', 'RETURN DISTINCT user'].join('\n');

  return session.query(query, { id }).then((result) => {
    if (result.hasNext()) {
      const record = result.next();
      return new User(record.get('user'));
    }
    throw { message: 'person not found', status: 404 };
  });
};

// get all people
const getAll = function(session) {
  return session.query('MATCH (user:User) RETURN user').then((result) => _manyPeople(result));
};

module.exports = {
  getAll,
  getById,
};
