import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const shopOwner = await prisma.user.upsert({
    where: { email: 'admin@slashdev.io' },
    update: {},
    create: {
      email: 'admin@slashdev.io',
      firstname: 'Slash',
      lastname: 'Dev',
      middlename: 'Admin',
      role: 'OWNER',
      password: '$2b$10$5kSjuC8/LJ6TT7CVVw3vXuDIJsOCvMXSGhQIAPXHRBhHAXoVgarsy',
      stores: {
        create: {
          name: 'SlashDev',
          address: 'Lagos, Nigeria',
          description: 'SlashDev is a software development company',
        },
      },
      Cart: {
        create: {},
      },
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      email: 'testuser@example.com',
      firstname: 'John',
      lastname: 'Doe',
      middlename: 'Test',
      role: 'USER',
      password: '$2b$10$5kSjuC8/LJ6TT7CVVw3vXuDIJsOCvMXSGhQIAPXHRBhHAXoVgarsy',
      Cart: {
        create: {},
      },
    },
  });
  console.log({ shopOwner, user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
