const { productController } = require("../services/productService");

const existor = async (req, res, next) => {
  const { name } = req.params;
  const product = await productController.getProductByName(name);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "존재하지 않는 상품입니다." });
  }
  next();
};

module.exports = { existor };
