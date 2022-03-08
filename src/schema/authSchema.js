const yup = require("yup");

const authSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().min(8).max(16).required(),
});

module.exports = authSchema;
