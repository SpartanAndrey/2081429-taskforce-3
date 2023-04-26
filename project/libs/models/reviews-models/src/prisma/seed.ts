// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PrismaClient } from '.prisma/reviews-client';

const prisma = new PrismaClient();

async function fillDb() {
    await prisma.review.upsert({
      where: { id: 1 },
      update: {},
      create:
        {
          review: 'Отличная работа, всем очень доволен, больше не обращусь конечно же, так как я иррационален.',
          taskId: 2,
          rating: 3,
          userId: 'asd-123',
          contractorId: 'asd-124'
        },
    });
    console.info('🤘️ Database was filled')
  }

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })