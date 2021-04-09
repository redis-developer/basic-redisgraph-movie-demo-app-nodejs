require('dotenv').config();

const nconf = require('nconf');

const {REDIS_ENDPOINT_URL, REDIS_PASSWORD} = process.env;
const [redisHost, redisPort] = (REDIS_ENDPOINT_URL || '127.0.0.1:6379').split(
  ':',
);

nconf
  .env(['PORT', 'NODE_ENV'])
  .argv({
    e: {
      alias: 'NODE_ENV',
      describe: 'Set production or development mode.',
      demand: false,
      default: 'development',
    },
    p: {
      alias: 'PORT',
      describe: 'Port to run on.',
      demand: false,
      default: 4000,
    },
    n: {
      alias: 'redis',
      describe: 'Use local or remote redis instance',
      demand: false,
      default: 'local',
    },
  })
  .defaults({
    REDIS_HOST: redisHost,
    REDIS_PORT: +redisPort,
    REDIS_PASSWORD: REDIS_PASSWORD,
    GRAPH_NAME: process.env.GRAPH_NAME || 'MovieApp',

    api_path: '/api',
  });

module.exports = nconf;
