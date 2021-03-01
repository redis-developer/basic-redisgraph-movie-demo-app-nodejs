// extracts just the data from the query results
const _ = require('lodash');
const md5 = require('md5');

const User = function(_node) {
  const { username } = _node.properties;

  _.extend(this, {
    id: _node.properties.id,
    username,
    avatar: {
      full_size: `https://www.gravatar.com/avatar/${md5(username)}?d=retro`
    }
  });
};
module.exports = User;
