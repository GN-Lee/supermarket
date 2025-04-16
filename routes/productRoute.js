const express = require("express");
const productRouter = express.Router();
const { productController } = require("../services/productService");
const { validator } = require("../middleware/validator");
const { existor } = require("../middleware/existor");

productRouter.get("/", async (req, res) => {
  await productController.getProducts();
  res.status(200).json({ success: true, message: "상품 목록 조회 성공" });
});

productRouter.get("/:name", async (req, res) => {
  const { name } = req.params;
  const product = await productController.getProductByName(name);
  if (product.length === 0) {
    return res.status(404).json({ success: false, message: "상품 조회 실패" });
  }
  res
    .status(200)
    .json({ success: true, message: "상품 조회 성공", data: product });
});

productRouter.post("/", validator, async (req, res) => {
  const { name, price } = req.body;
  const product = await productController.createProduct(name, price);
  if (!name || !price) {
    return res
      .status(400)
      .json({ success: false, message: "상품명과 가격은 필수입니다." });
  }
  res
    .status(201)
    .json({ success: true, message: "상품 추가 성공", data: product });
});

productRouter.put("/", existor, async (req, res) => {
  const { id, name, price } = req.body;
  const product = await productController.updateProduct(id, name, price);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "상품 수정 실패, 상품을 찾을 수 없습니다.",
    });
  }
  res.status(200).json({ success: true, message: "상품 수정 성공" });
});

productRouter.delete("/", existor, async (req, res) => {
  const { id } = req.body;
  const product = await productController.deleteProduct(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "상품 삭제 실패, 상품을 찾을 수 없습니다.",
    });
  }
  res.status(200).json({ success: true, message: "상품 삭제 성공" });
});

module.exports = { productRouter };
