const { Router } = require('express');
const { people, users } = require('../controllers');

const peopleRouter = Router();

peopleRouter.get('/', people.list);
peopleRouter.get('/me', users.me);
peopleRouter.get('/:id', people.findById);

module.exports = peopleRouter;
