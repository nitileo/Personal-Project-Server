require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");
const userRoute = require("./routes/user-route");
const cartRoute = require("./routes/cart-route");
const orderRoute = require("./routes/order-route");
const productRoute = require("./routes/product-route");
const cors = require("cors");
const handleError = require("./middlewares/error");
const notFound = require("./middlewares/notfound");

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);

app.use(handleError);
app.use("*", notFound);

app.listen(8080, () => console.log("Server is running on port 8080"));
