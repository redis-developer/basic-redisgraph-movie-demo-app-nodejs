// extracts just the data from the query results

const _ = require('lodash');

const Person = function(_node) {
  _.extend(this, _node.properties);
  this.poster_image = this.poster;
};

module.exports = Person;
