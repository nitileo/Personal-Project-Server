const createError = require("../utils/create-error");
const prisma = require("../config/prisma");

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const result = await prisma.shoppingCart.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        amount: true,
        product: {
          select: {
            id: true,
            image: true,
            title: true,
            price: true,
          },
        },
      },
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.addProductCart = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const { productId } = req.body;

    const haveBook = await prisma.shoppingCart.findFirst({
      where: {
        userId,
        productId: +productId,
      },
    });

    if (haveBook) {
      const result = await prisma.shoppingCart.update({
        where: {
          id: haveBook.id,
        },
        data: {
          amount: haveBook.amount + 1,
        },
      });
      res.json(result);
    } else {
      const result = await prisma.shoppingCart.create({
        data: {
          userId: userId,
          productId: +productId,
          amount: 1,
        },
      });
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteProductOnCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const rs = await prisma.shoppingCart.delete({
      where: {
        id: +cartId,
      },
    });
    res.json("delete success");
  } catch (err) {
    next(err);
  }
};

exports.updateProductOnCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { amount } = req.body;

    const rs = await prisma.shoppingCart.update({
      where: {
        id: +cartId,
      },
      data: {
        amount: +amount,
      },
    });
    res.json(rs);
  } catch (err) {
    next(err);
  }
};
