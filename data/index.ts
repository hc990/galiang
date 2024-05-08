import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

async function main() {
    // const allUsers = await prisma.authors.findMany()
    // console.log(allUsers)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })