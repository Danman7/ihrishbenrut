import { Chapter, PrismaClient } from '../app/generated/prisma'
import * as fs from 'fs'

const prisma = new PrismaClient()

async function importData() {
  const data = JSON.parse(fs.readFileSync('data-export.json', 'utf8'))

  await prisma.chapterContent.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.book.deleteMany()
  await prisma.wisdom.deleteMany()
  await prisma.prayer.deleteMany()

  for (const book of data.books) {
    const { chapters, ...bookData } = book

    await prisma.book.create({
      data: {
        ...bookData,
        chapters: {
          create: chapters.map(
            (chapter: Chapter & { content: [{ text: string }] }) => {
              const { bookId, content, ...chapterData } = chapter
              return {
                ...chapterData,
                content: {
                  create: { text: content[0].text },
                },
              }
            }
          ),
        },
      },
    })
  }

  for (const wisdom of data.wisdom) {
    const { id, ...wisdomData } = wisdom
    await prisma.wisdom.create({ data: wisdomData })
  }

  for (const prayer of data.prayers) {
    await prisma.prayer.create({ data: prayer })
  }

  await prisma.$disconnect()
}

importData().catch(console.error)
