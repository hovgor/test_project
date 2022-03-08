module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(req.customStatus || 500).json({
    message: err.message || "Something went wrong",
  });
};
