// const { prisma } = require('@/prisma/client') 
import { PrismaClient } from '@prisma/client'
import { categories, products, user } from './data.js'

const prisma = new PrismaClient()
const load = async () => {
  try {
    await prisma.categorie.deleteMany();
    console.log('Deleted records in category table');

    await prisma.product.deleteMany();
    console.log('Deleted records in product table');

    await prisma.user.deleteMany();
    console.log('Deleted records in user table');

    await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`;
    console.log('reset product auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Categorie AUTO_INCREMENT = 1`;
    console.log('reset category auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log('reset user auto increment to 1');

    await prisma.categorie.createMany({
      data: categories,
    });
    console.log('Added category data');

    await prisma.product.createMany({
      data: products,
    });
    console.log('Added product data');
    
    await prisma.user.createMany({
      data: user,
    });
    console.log('Added user data');

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();