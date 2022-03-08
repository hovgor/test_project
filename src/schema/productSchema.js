const yup = require("yup");

const productSchema = yup.object({
  productName: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  price: yup.string().required(),
});
module.exports = productSchema;
