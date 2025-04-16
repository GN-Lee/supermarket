const existor = async (req, res, next) => {
  const { id } = req.params;
  const product = await prisma.products.findMany({
    where: { id },
  });
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "존재하지 않는 상품입니다." });
  }
  next();
};

module.exports = { existor };
