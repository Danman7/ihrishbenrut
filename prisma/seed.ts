import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

export async function main() {
  await prisma.prayer.update({
    where: {
      id: 'dobrata-molitva',
    },
    data: {
      rank: 2,
    },
  })

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
