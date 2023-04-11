import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
    await prisma.task.upsert({
      where: { taskId: 1 },
      update: {},
      create:
        {
          title: '',
          description: '',
          category: {
            create: 
              {
                title: ''
              },
          },
          price: 300,
          dueDate: new Date('2023-05-25'),
          address: '',
          tags: [''],
          city: 'Москва',
          userId: '',
          status: 'Новое',
          responses: ['']

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