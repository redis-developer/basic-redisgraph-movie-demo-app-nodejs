const { Router } = require('express');
const { genres } = require('../controllers');

const genresRouter = Router();

genresRouter.get('/', genres.list);

module.exports = genresRouter;
