const RedisGraph = require('redisgraph.js').Graph;
const nconf = require('../config');

const graphName = nconf.get('GRAPH_NAME');
const host = nconf.get('REDIS_HOST');
const port = nconf.get('REDIS_PORT');
const password = nconf.get('REDIS_PASSWORD');

const graph = new RedisGraph(graphName, host, port, {password});

exports.getSession = () => graph;
