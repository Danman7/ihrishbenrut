import { PrismaClient, Prisma } from '../app/generated/prisma'

const prisma = new PrismaClient()

export async function main() {
  await prisma.chapter.update({
    where: { id: 'yavlenieto-na-duha' },
    data: {
      number: 3,
    },
  })

  console.log('Seed data inserted successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
