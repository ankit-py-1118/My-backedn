const errorHandlingMiddleware = async (err, req, res, next) => {
	return res?.status(err?.status || 500)?.json({
		errorMessage: err?.message
	});
};

module.exports = {
  errorHandlingMiddleware,
};
