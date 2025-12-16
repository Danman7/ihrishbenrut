import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

export async function main() {
  await prisma.wisdom.createMany({
    data: [
      {
        source: 'Учителят',
        topics: ['Истината'],
        text: 'Когато си в Истината и имаш чисто Сърце, дойде ти някаква голяма мъка, отчаяние, страдание - веднага ти става леко, приятно, освобождаваш се. Когато не си в Истината, и ти дойде голяма мъка и страдание - ти се отчайваш.',
      },
      {
        source: 'Учителят',
        topics: ['Бога'],
        text: 'Когато не можеш да се помириш с някого, помири се с бога в него.',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
