const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

const productController = {
  getProducts: async () => {
    const products = await prisma.products.findMany();
    return products;
  },

  getProductByName: async (name) => {
    const products = await prisma.products.findMany({
      where: { name },
    });
    return products;
  },

  createProduct: async (name, price) => {
    const products = await prisma.products.create({
      data: {
        name,
        price: +price,
      },
    });
    return products;
  },

  updateProduct: async (id, name, price) => {
    const products = await prisma.products.update({
      where: { id: +id },
      data: { name, price: +price },
    });
    return products;
  },

  deleteProduct: async (id) => {
    const products = await prisma.products.delete({
      where: { id: +id },
    });
    return products;
  },
};

module.exports = { productController };
