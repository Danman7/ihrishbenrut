import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const book = await prisma.book.create({
    data: {
      title: 'Ето човекът!',
      year: 1999,
      chapters: {
        create: [
          {
            number: 1,
            title: 'Chapter One',
            content: [
              'This is the first paragraph of the first chapter.',
              'Here is the second paragraph.',
              'And a third one to prove splitting works.',
            ].join('\n\n'),
          },
          {
            number: 2,
            title: 'Another Chapter',
            content: 'Single paragraph chapter example.',
          },
        ],
      },
    },
  })

  console.log('Seeded book:', book.title)
}

main().finally(() => prisma.$disconnect())
