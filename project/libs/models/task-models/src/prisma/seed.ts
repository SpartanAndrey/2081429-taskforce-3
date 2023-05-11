// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PrismaClient } from '.prisma/tasks-client';

const prisma = new PrismaClient();

async function fillDb() {
  try {
    await prisma.task.upsert({
      where: { taskId: 1 },
      update: {},
      create:
        {
          title: 'Сесть на пенёк',
          description: 'Если косарь есть, то сесть на пенёк',
          category: {
            create: 
              {
                title: 'Пеньки'
              },
          },
          price: 300,
          dueDate: new Date('2023-05-25'),
          address: '',
          tags: ["косарь", "пенёк"],
          city: 'Moscow',
          userId: '',
          contractorId: '',
          status: 'Completed',
          responses: ['']
        },
    });
    console.info('🤘️ Database was filled')

  } catch(err) {
    console.error(err);

    await prisma.$disconnect();

    process.exit(1);
  }
}

fillDb();
