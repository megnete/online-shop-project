function handleError(error, req, res, next) {
    console.error(error);
    res.status(500).render("shared/500"); }

module.exports = handleError;