const express = require("express");
const app = express();
const { productRouter } = require("./routes/productRoute");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("쇼핑시작");
});
