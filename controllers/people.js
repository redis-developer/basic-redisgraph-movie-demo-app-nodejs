const People = require('../models/actions/people');
const { writeResponse } = require('../helpers/response');
const dbUtils = require('../db/dbUtils');

/**
 * @swagger
 * definition:
 *   Person:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       poster_image:
 *         type: string
 */

/**
 * @swagger
 * /people:
 *   get:
 *     tags:
 *     - people
 *     description: Returns all people
 *     summary: Returns all people
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of people
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Person'
 */
exports.list = function(req, res, next) {
  People.getAll(dbUtils.getSession())
    .then((response) => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /people/{id}:
 *   get:
 *     tags:
 *     - people
 *     description: Returns a person by id
 *     summary: Returns a person by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Person id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A person
 *         schema:
 *           $ref: '#/definitions/Person'
 *       400:
 *         description: Error message(s)
 *       404:
 *         description: Person not found
 */
exports.findById = function(req, res, next) {
  const { id } = req.params;
  if (!id) throw { message: 'Invalid id', status: 400 };

  People.getById(dbUtils.getSession(), id)
    .then((response) => {
      writeResponse(res, response);
    })
    .catch(next);
};
