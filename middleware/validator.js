const validator = (req, res, next) => {
  const { name, price } = req.body;

  // 이름과 가격을 입력해주세요 : 빈 값 체크
  if (!name || !price.trim()) {
    res
      .status(400)
      .json({ success: false, message: "이름과 가격을 입력해주세요." });
  }
  next();

  // 이름과 가격 타입 확인
  if (typeof name !== "string" || typeof price !== "number") {
    res
      .status(400)
      .json({ success: false, message: "명시된 타입에 따라 입력해주세요." });
  }
  next();
};

module.exports = { validator };
