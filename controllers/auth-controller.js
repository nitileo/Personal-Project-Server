const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
const prisma = require("../config/prisma");

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.input;

    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserExist) {
      return createError(400, "User Already Exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        firstName,
        lastName,
        phone,
      },
    });

    res.json({ message: "Register Successful" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.input;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return createError(400, "user does not exist");
    }

    if (user.isDelete) {
      return createError(400, "Your Account was banned");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return createError(401, "Unauthorize");
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    // 5. Generate Token
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });
    // 6. Send to frontend
    res.json({
      user: payload,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const email = req.user.user.email;
    const member = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    console.log(email);
    res.json({ member });
  } catch (err) {
    next(err);
  }
};
