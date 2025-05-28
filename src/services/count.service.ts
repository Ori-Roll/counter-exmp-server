import { PrismaClient } from '@prisma/client';
import { CountDTO, CreateCountDTO, UpdateCountDTO } from '../types/count';

// Singleton pattern for Prisma client
class PrismaInstance {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!PrismaInstance.instance) {
      PrismaInstance.instance = new PrismaClient();
    }
    return PrismaInstance.instance;
  }
}

export class CountService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = PrismaInstance.getInstance();
  }

  async getAllCounts(): Promise<CountDTO[]> {
    try {
      const counts = await this.prisma.count.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      });
      return counts;
    } catch (error) {
      console.error('Error getting all counts:', error);
      throw new Error('Failed to get counts');
    }
  }

  async getCountById(id: number): Promise<CountDTO | null> {
    try {
      const count = await this.prisma.count.findUnique({
        where: { id },
      });
      return count;
    } catch (error) {
      console.error(`Error getting count with id ${id}:`, error);
      throw new Error(`Failed to get count with id ${id}`);
    }
  }

  async createCount(data: CreateCountDTO): Promise<CountDTO> {
    try {
      const newCount = await this.prisma.count.create({
        data: {
          value: data.value,
        },
      });
      return newCount;
    } catch (error) {
      console.error('Error creating count:', error);
      throw new Error('Failed to create count');
    }
  }

  async updateCount(
    id: number,
    data: UpdateCountDTO
  ): Promise<CountDTO | null> {
    try {
      // Check if count exists
      const existingCount = await this.prisma.count.findUnique({
        where: { id },
      });
      if (!existingCount) {
        return null;
      }
      const updatedCount = await this.prisma.count.update({
        where: { id },
        data: {
          value: data.value,
        },
      });
      return updatedCount;
    } catch (error) {
      console.error(`Error updating count with id ${id}:`, error);
      throw new Error(`Failed to update count with id ${id}`);
    }
  }

  async deleteCount(id: number): Promise<CountDTO | null> {
    try {
      // Check if count exists
      const existingCount = await this.prisma.count.findUnique({
        where: { id },
      });
      if (!existingCount) {
        return null;
      }
      const deletedCount = await this.prisma.count.delete({
        where: { id },
      });
      return deletedCount;
    } catch (error) {
      console.error(`Error deleting count with id ${id}:`, error);
      throw new Error(`Failed to delete count with id ${id}`);
    }
  }

  // For a simple increment/decrement functionality
  async incrementCount(id: number): Promise<CountDTO | null> {
    try {
      const existingCount = await this.prisma.count.findUnique({
        where: { id },
      });

      if (!existingCount) {
        return null;
      }

      const updatedCount = await this.prisma.count.update({
        where: { id },
        data: {
          value: {
            increment: 1,
          },
        },
      });
      return updatedCount;
    } catch (error) {
      console.error(`Error incrementing count with id ${id}:`, error);
      throw new Error(`Failed to increment count with id ${id}`);
    }
  }

  async decrementCount(id: number): Promise<CountDTO | null> {
    try {
      const existingCount = await this.prisma.count.findUnique({
        where: { id },
      });

      if (!existingCount) {
        return null;
      }

      const updatedCount = await this.prisma.count.update({
        where: { id },
        data: {
          value: {
            decrement: 1,
          },
        },
      });
      return updatedCount;
    } catch (error) {
      console.error(`Error decrementing count with id ${id}:`, error);
      throw new Error(`Failed to decrement count with id ${id}`);
    }
  }
}

export default new CountService();
