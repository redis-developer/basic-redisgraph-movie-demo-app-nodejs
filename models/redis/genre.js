// extracts just the data from the query results
const _ = require('lodash');

const Genre = function(_node) {
  _.extend(this, _node.properties);
  if (this.id) {
    this.id = this.id.toNumber();
  } else {
    this.id = this.name;
  }
};

module.exports = Genre;
