import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a new user (Shop Owner)
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

  // create a new user (Customer)
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

  // create a new product
  const product = await prisma.product.create({
    data: {
      title: 'Test Product',
      image: 'https://picsum.photos/200',
      description: 'Test Product Description',
      price: 100,
      discount: 10,
      store: {
        connect: {
          id: 1,
        },
      },
    },
  });

  console.log({ product });
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
