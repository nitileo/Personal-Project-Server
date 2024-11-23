const createError = require("../utils/create-error");
const prisma = require("../config/prisma");

exports.listProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany({
      where: {
        isDelete: false,
      },
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
        image: true,
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

const handleQuery = async (req, res, query) => {
  try {
    //code
    const products = await prisma.product.findMany({
      where: {
        isDelete: false,
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
      },
    });
    res.send(products);
  } catch (err) {
    //err
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};

const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isDelete: false,
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error " });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    // code
    const { query, category } = req.body;

    if (query) {
      console.log("query-->", query);
      await handleQuery(req, res, query);
    }
    if (category) {
      console.log("category-->", category);
      await handleCategory(req, res, category);
    }

    // res.send('Hello searchFilters Product')
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listCategory = async (req, res, next) => {
  try {
    // code
    const category = await prisma.category.findMany();
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.newRelease = async (req, res, next) => {
  try {
    const newRelease = await prisma.product.findMany({
      where: {
        isDelete: false,
      },
      orderBy: {
        publishDate: "desc",
      },
      take: 10,
    });
    res.json(newRelease);
  } catch (err) {
    next(err);
  }
};

exports.bestSeller = async (req, res, next) => {
  try {
    const bestSeller = await prisma.product.findMany({
      where: {
        isDelete: false,
      },
      orderBy: {
        sellAmount: "desc",
      },
      take: 10,
    });
    res.json(bestSeller);
  } catch (err) {
    next(err);
  }
};

exports.recommend = async (req, res, next) => {
  try {
    const recommend = await prisma.product.findMany({
      where: {
        isDelete: false,
      },
      orderBy: [
        {
          sellAmount: "desc",
        },
        {
          publishDate: "desc",
        },
      ],
      take: 3,
    });
    res.json(recommend);
  } catch (err) {
    next(err);
  }
};
