const Genres = require('../models/actions/genres');
const { writeResponse } = require('../helpers/response');
const dbUtils = require('../db/dbUtils');

/**
 * @swagger
 * definition:
 *   Genre:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     tags:
 *     - genres
 *     description: Returns all genres
 *     summary: Returns all genres
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of genres
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Genre'
 */
exports.list = function(req, res, next) {
  Genres.getAll(dbUtils.getSession())
    .then((response) => writeResponse(res, response))
    .catch(next);
};
