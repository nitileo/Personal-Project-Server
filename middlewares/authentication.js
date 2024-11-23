const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    // 1. Check Header
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader) {
      return createError(401, "Unauthorize");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return createError(401, "Unauthorize");
    }
    // 2. Decode Token
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return createError(401, "Unauthorize");
      }
      req.user = decode;
      next();
    });

    // 3. Next
  } catch (error) {
    next(error);
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Acess Denied: Admin Only" });
    }
    // console.log('admin check', adminUser)
    next();
  } catch (err) {
    next(err);
  }
};
