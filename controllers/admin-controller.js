const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");

const createError = require("../utils/create-error");

exports.listMember = async (req, res, next) => {
  try {
    const members = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isDelete: true,
      },
    });
    res.json(members);
  } catch (err) {
    next(err);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const { role } = req.body;
    console.log(req.body);
    const user = await prisma.user.update({
      where: {
        id: Number(memberId),
      },
      data: {
        role: role,
      },
    });
    res.json({ message: "Update Success" });
  } catch (err) {
    next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    await prisma.user.update({
      where: {
        id: Number(memberId),
      },
      data: {
        isDelete: true,
      },
    });
    res.json("Delete Success");
  } catch (err) {
    next(err);
  }
};

exports.unBannedMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    await prisma.user.update({
      where: {
        id: Number(memberId),
      },
      data: {
        isDelete: false,
      },
    });
    res.json("Delete Success");
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        author: true,
        description: true,
        price: true,
        amount: true,
        sellAmount: true,
        publishDate: true,
        publisher: true,
        categoryId: true,
        imageId: true,
        isDelete: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(allProduct);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      amount,
      image,
      categoryId,
      author,
      publishDate,
      publisher,
    } = req.body;

    const haveBook = await prisma.product.findUnique({
      where: {
        title,
      },
    });

    if (haveBook) {
      return createError(400, "Already have this book");
    }

    let result = { secure_url: "", public_id: "" };

    if (image) {
      result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `Nitipong-${Date.now()}`,
        resource_type: "auto",
        folder: "PersonalProject",
      });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        author,
        price: +price,
        amount: +amount,
        categoryId: +categoryId,
        image: result.secure_url,
        imageId: result.public_id,
        publisher,
        publishDate,
      },
    });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const target = await prisma.product.update({
      where: {
        id: +productId,
      },
      data: {
        isDelete: true,
      },
    });

    res.json("Delete Success");
  } catch (err) {
    next(err);
  }
};

exports.reactiveProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const target = await prisma.product.update({
      where: {
        id: +productId,
      },
      data: {
        isDelete: false,
      },
    });

    res.json(target);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      title,
      description,
      price,
      amount,
      image,
      imageId,
      categoryId,
      author,
      publishDate,
      publisher,
    } = req.body;

    const target = await prisma.product.findUnique({
      where: {
        id: +productId,
      },
    });

    if (!target) {
      return createError(404, "Product Not Found");
    }

    let updatedImage = target.image;
    let updatedImageId = target.imageId;

    if (image && target.imageId !== imageId) {
      if (target.imageId) {
        await cloudinary.uploader.destroy(target.imageId);
      }

      const result = await cloudinary.uploader.upload(image, {
        public_id: `Nitipong-${Date.now()}`,
        resource_type: "auto",
        folder: "PersonalProject",
      });

      updatedImage = result.secure_url;
      updatedImageId = result.public_id;
    }

    const product = await prisma.product.update({
      where: {
        id: +productId,
      },
      data: {
        title,
        description,
        price: +price,
        amount: +amount,
        image: updatedImage, // Use updated image URL
        imageId: updatedImageId, // Use updated image ID
        categoryId: +categoryId,
        author,
        publishDate,
        publisher,
      },
    });

    res.json(product);
    console.log("Product updated successfully");
  } catch (err) {
    next(err);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await prisma.order.findMany({
      select: {
        id: true,
        summary: true,
        addressId: true,
        address: true,
        status: true,
        isCancel: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
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
        payments: {
          select: {
            slipImage: true,
          },
        },
      },
    });
    res.json(allOrder);
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await prisma.order.findUnique({
      where: {
        id: Number(orderId),
      },
      include: {
        orderItems: true, // Ensure orderItems are included for the PACKING status
        payments: true, // Include payments to check if a payment exists (no isPaid field)
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update order status (no isPaid field anymore)
    const updatedOrder = await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status: status,
      },
    });

    // If status is PACKING, update the product's sellAmount
    if (status === "PACKING") {
      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            sellAmount: {
              increment: item.amount,
            },
          },
        });
      }
    }

    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const cancelOrder = await prisma.order.update({
      where: {
        id: +orderId,
      },
      data: {
        isCancel: true,
      },
    });
    res.json(cancelOrder);
  } catch (err) {
    next(err);
  }
};
