require("dotenv").config();
const prisma = require("../config/prisma");

async function run() {
  await prisma.$executeRawUnsafe("DROP DATABASE my-db-personalproject");
  await prisma.$executeRawUnsafe("CREATE DATABASE my-db-personalproject");
}

console.log("Reset DB...");
run();
