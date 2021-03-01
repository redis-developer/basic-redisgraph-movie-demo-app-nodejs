require('dotenv').config();

const nconf = require('nconf');

nconf.env(['PORT', 'NODE_ENV'])
  .argv({
    e: {
      alias: 'NODE_ENV',
      describe: 'Set production or development mode.',
      demand: false,
      default: 'development'
    },
    p: {
      alias: 'PORT',
      describe: 'Port to run on.',
      demand: false,
      default: 3001
    },
    n: {
      alias: 'redis',
      describe: 'Use local or remote redis instance',
      demand: false,
      default: 'local'
    }
  })
  .defaults({
    REDIS_HOST: process.env.REDIS_CLOUD_HOST,
    REDIS_PORT: process.env.REDIS_CLOUD_PORT,
    REDIS_PASSWORD: process.env.REDIS_CLOUD_PASSWORD,
    GRAPH_NAME: process.env.GRAPH_NAME,

    base_url: 'http://localhost:3001',
    api_path: '/'
  });

module.exports = nconf;
