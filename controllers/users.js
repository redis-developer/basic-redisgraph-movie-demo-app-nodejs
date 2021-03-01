const Users = require('../models/actions/users');
const { writeResponse } = require('../helpers/response');
const loginRequired = require('../middlewares/loginRequired');
const dbUtils = require('../db/dbUtils');

/**
 * @swagger
 * definition:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       username:
 *         type: string
 *       avatar:
 *         type: object
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *     - auth
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Your new user
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Error message(s)
 */
exports.register = function(req, res, next) {
  const { username } = req.body;
  const { password } = req.body;

  if (!username) {
    throw { username: 'This field is required.', status: 400 };
  }
  if (!password) {
    throw { password: 'This field is required.', status: 400 };
  }

  Users.register(dbUtils.getSession(), username, password)
    .then((response) => writeResponse(res, response, 201))
    .catch(next);
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *     - auth
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: succesful login
 *         schema:
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: invalid credentials
 */
exports.login = function(req, res, next) {
  const { username, password } = req.body;

  if (!username) {
    throw { username: 'This field is required.', status: 400 };
  }
  if (!password) {
    throw { password: 'This field is required.', status: 400 };
  }

  Users.login(dbUtils.getSession(), username, password)
    .then((response) => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /people/me:
 *   get:
 *     tags:
 *     - people
 *     description: Get your user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         type: string
 *         required: true
 *         description: Token (token goes here)
 *     responses:
 *       200:
 *         description: the user
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         description: invalid / missing authentication
 */
exports.me = function(req, res, next) {
  loginRequired(req, res, () => {
    const authHeader = req.headers.authorization;
    const match = authHeader.match(/^Token (\S+)/);
    if (!match || !match[1]) {
      throw { message: 'invalid authorization format. Follow `Token <token>`', status: 401 };
    }

    const token = match[1];
    Users.me(dbUtils.getSession(), token)
      .then((response) => writeResponse(res, response))
      .catch(next);
  });
};
