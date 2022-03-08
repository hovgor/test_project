const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
};

module.exports = { validateSchema };
