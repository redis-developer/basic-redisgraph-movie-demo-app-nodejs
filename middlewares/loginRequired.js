const writeError = require('../helpers/response').writeResponse;

module.exports = function loginRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return writeError(res, { detail: 'no authorization provided' }, 401);
  }
  next();
};
