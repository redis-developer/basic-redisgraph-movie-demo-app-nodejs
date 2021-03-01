const uuid = require('node-uuid');
const randomstring = require('randomstring');
const crypto = require('crypto');
const User = require('../redis/user');

const register = function(session, username, password) {
  return session.query('MATCH (user:User {username: $username}) RETURN user', { username })
    .then((results) => {
      if (results.hasNext()) {
        throw { username: 'username already in use', status: 400 };
      } else {
        return session.query('CREATE (user:User {id: $id, username: $username, password: $password, api_key: $api_key}) RETURN user',
          {
            id: uuid.v4(),
            username,
            password: hashPassword(username, password),
            api_key: randomstring.generate({
              length: 20,
              charset: 'hex'
            })
          })
          .then((createdUser) => {
            while (createdUser.hasNext()) {
              const record = createdUser.next();
              return new User(record.get('user'));
            }
          });
      }
    });
};

const me = function(session, apiKey) {
  return session.query('MATCH (user:User {api_key: $api_key}) RETURN user', { api_key: apiKey })
    .then((foundedUser) => {
      if (!foundedUser.hasNext()) {
        throw { message: 'invalid authorization key', status: 401 };
      }
      while (foundedUser.hasNext()) {
        const record = foundedUser.next();
        return new User(record.get('user'));
      }
    });
};

const login = function(session, username, password) {
  return session.query('MATCH (user:User {username: $username}) RETURN user', { username })
    .then((foundedUser) => {
      if (!foundedUser.hasNext()) {
        throw { username: 'username does not exist', status: 400 };
      } else {
        while (foundedUser.hasNext()) {
          const record = foundedUser.next();
          const dbUser = (record.get('user')).properties;
          if (dbUser.password !== hashPassword(username, password)) {
            throw { password: 'wrong password', status: 400 };
          }
          return { token: dbUser.api_key };
        }
      }
    });
};

function hashPassword(username, password) {
  const s = `${username}:${password}`;
  return crypto.createHash('sha256').update(s).digest('hex');
}

module.exports = {
  register,
  me,
  login
};
