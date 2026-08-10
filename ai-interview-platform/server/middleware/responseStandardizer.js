const ApiVersionHandler = require('../utils/apiVersionHandler');
const { sendSuccess, sendCreated, sendError, paginatedResponse } = require('../utils/apiResponse');

const responseStandardizer = (req, res, next) => {
  // Attach helper response methods to Express res object
  res.success = (data, statusCode = 200, message = 'OK') => sendSuccess(res, data, statusCode, message);
  res.created = (data, message = 'Resource created successfully') => sendCreated(res, data, message);
  res.badRequest = (message = 'Bad request', errors = null) => sendError(res, message, 400, errors);
  res.unauthorized = (message = 'Unauthorized access') => sendError(res, message, 401);
  res.forbidden = (message = 'Access forbidden') => sendError(res, message, 403);
  res.notFound = (message = 'Resource not found') => sendError(res, message, 404);
  res.internalError = (message = 'Internal server error', errors = null) => sendError(res, message, 500, errors);
  res.paginated = (data, total, page, limit, message = 'OK') => paginatedResponse(res, data, total, page, limit, message);

  const originalJson = res.json.bind(res);
  res.json = function (body) {
    if (body && typeof body === 'object' && !body._meta) {
      const version = req.apiVersion || '1.0';
      body._meta = {
        version,
        deprecated: ApiVersionHandler.isDeprecated(version),
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method,
        ...(ApiVersionHandler.isDeprecated(version) && {
          sunset: ApiVersionHandler.getSunsetDate(version),
          migration: ApiVersionHandler.getMigrationGuide(version),
        }),
      };
    }
    return originalJson(body);
  };
  next();
};

module.exports = responseStandardizer;
