const yup = require("yup");

const userSchema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().min(8).max(16).required(),
});

module.exports = userSchema;
