require('dotenv').config();

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const nconf = require('./config');
const setAuthUser = require('./middlewares/setAuthUser');
const { writeError } = require('./helpers/response');
const {
  moviesRouter, peopleRouter, authRouter, genresRouter, dataRouter
} = require('./routes');

const app = express();
const api = express();

app.use(nconf.get('api_path'), api);

const swaggerDefinition = {
  info: {
    title: 'Redis-graph Movie Demo API (Node/Express)',
    version: '1.0.0',
    description: '',
  },
  host: 'localhost:3001',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./controllers/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.set('port', nconf.get('PORT'));

api.use(bodyParser.json());
api.use(methodOverride());

// enable CORS
api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// api custom middlewares:
api.use(setAuthUser);

// api routes

api.use('/auth', authRouter);

api.use('/movies', moviesRouter);

api.use('/user', peopleRouter);

api.use('/genres', genresRouter);

api.use('/data', dataRouter);

// api error handler
api.use((err, req, res, next) => {
  if (err && err.status) {
    writeError(res, err);
  } else next(err);
});

app.listen(app.get('port'), () => {
  console.log(
    `Express server listening on port ${app.get('port')} see docs at /docs`
  );
});
