const createError = require("../utils/create-error");
const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const { cart, addressId, totalPrice, image } = req.body;

    const order = await prisma.order.create({
      data: {
        userId: +userId,
        addressId,
        summary: +totalPrice,
        orderItems: {
          create: cart.map((el) => ({
            productId: +el.product.id,
            amount: el.amount,
            summary: el.amount * el.product.price,
          })),
        },
      },
    });

    let result = { secure_url: "", public_id: "" };

    if (image) {
      result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `Nitipong-${Date.now()}`,
        resource_type: "auto",
        folder: "PersonalProject-Payment",
      });
    }

    const payment = await prisma.payment.create({
      data: {
        slipImage: result.secure_url,
        orderId: order.id,
      },
    });

    await prisma.shoppingCart.deleteMany({
      where: {
        userId: userId, // Delete all cart items for this user
      },
    });

    res.json("create order success");
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.user.id;

    const orderById = await prisma.order.findMany({
      where: {
        userId: +userId,
      },
      select: {
        id: true,
        summary: true,
        addressId: true,
        address: true,
        status: true,
        isCancel: true,
        orderItems: {
          select: {
            productId: true,
            amount: true,
            product: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    res.json(orderById);
  } catch (err) {
    next(err);
  }
};
