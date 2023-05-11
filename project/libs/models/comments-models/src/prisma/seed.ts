// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PrismaClient } from '.prisma/comments-client';

const prisma = new PrismaClient();

async function fillDb() {
  try {
    await prisma.comment.upsert({
      where: { id: 1 },
      update: {},
      create:
        {
          comment: 'Что за задание, запишите кто-нить голосовое - я не умею читать.',
          taskId: 2,
          userId: 'asd-123'
        },
    });
    console.info('🤘️ Database was filled');

    await prisma.$disconnect();

  } catch(err) {
    console.error(err);

    await prisma.$disconnect();

    process.exit(1);
  } 
}

fillDb();
