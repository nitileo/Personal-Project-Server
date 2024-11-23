const createError = require("../utils/create-error");
const prisma = require("../config/prisma");

exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { email, firstName, lastName, phone } = req.body;
    const updateUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        firstName,
        lastName,
        phone,
      },
    });
    res.json(updateUser);
  } catch (err) {
    next(err);
  }
};

exports.getAddress = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const userAddress = await prisma.address.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!userAddress) {
      const newAddress = await prisma.address.create({
        data: {
          userId: userId,
          addressNumber: "",
          subdistrict: "",
          district: "",
          province: "",
          zipcode: "",
        },
      });
      res.json(newAddress);
    }

    res.json(userAddress);
  } catch (err) {
    next(err);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const userId = req.user.user.id;
    const { addressNumber, subdistrict, district, province, zipcode } =
      req.body;
    const updateAddress = await prisma.address.update({
      where: {
        userId,
      },
      data: {
        addressNumber,
        subdistrict,
        district,
        province,
        zipcode,
      },
    });
    res.json(updateAddress);
  } catch (err) {
    next(err);
  }
};
