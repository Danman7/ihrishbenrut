import { PrismaClient } from '../app/generated/prisma'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function exportData() {
  const data = {
    books: await prisma.book.findMany({
      include: {
        chapters: {
          include: {
            content: true,
          },
        },
      },
    }),
    wisdom: await prisma.wisdom.findMany(),
    prayers: await prisma.prayer.findMany(),
  }

  fs.writeFileSync('data-export.json', JSON.stringify(data, null, 2))

  await prisma.$disconnect()
}

exportData().catch(console.error)
