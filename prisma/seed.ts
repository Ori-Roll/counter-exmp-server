import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Main seed function
 */
async function main() {
  try {
    console.log('Starting database seeding...');

    // Clear existing records to avoid duplicates on re-seeding
    await prisma.count.deleteMany({});
    console.log('Cleared existing records');

    // Create sample count records
    const counts = await Promise.all([
      prisma.count.create({
        data: {
          value: 10,
        },
      }),
      prisma.count.create({
        data: {
          value: 25,
        },
      }),
      prisma.count.create({
        data: {
          value: 50,
        },
      }),
      prisma.count.create({
        data: {
          value: 100,
        },
      }),
      prisma.count.create({
        data: {
          value: 0,
        },
      }),
    ]);

    console.log('Database seeding completed successfully');
    console.log('Created counts:');
    counts.forEach((count, index) => {
      console.log(`[${index + 1}] ID: ${count.id}, Value: ${count.value}, Updated: ${count.updatedAt}`);
    });

    return counts;
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}

// Execute the seed function
main()
  .then(async () => {
    // Close the database connection when done
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Error during database seeding:', error);
    // Close the database connection on error
    await prisma.$disconnect();
    process.exit(1);
  });

