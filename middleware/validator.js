const validator = (req, res, next) => {
  const { name, price } = req.body;

  // 빈 값 체크
  if (name.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "이름을 입력해주세요." });
  }

  if (isNaN(price)) {
    return res
      .status(400)
      .json({ success: false, message: "가격은 숫자만 입력해주세요." });
  }

  next();
};

module.exports = { validator };
