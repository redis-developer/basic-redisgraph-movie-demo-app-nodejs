const { Router } = require('express');
const { users } = require('../controllers');

const authRouter = Router();

authRouter.post('/register', users.register);
authRouter.post('/login', users.login);

module.exports = authRouter;
