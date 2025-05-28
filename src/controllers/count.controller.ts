import { Request, Response } from 'express';
import countService from '../services/count.service';
import { 
  CountResponse, 
  CountsResponse, 
  CreateCountDTO, 
  UpdateCountDTO 
} from '../types/count';

export class CountController {
  /**
   * Get all counts
   */
  async getAllCounts(req: Request, res: Response<CountsResponse>): Promise<void> {
    try {
      const counts = await countService.getAllCounts();
      res.status(200).json({
        success: true,
        data: counts
      });
    } catch (error) {
      console.error('Error in getAllCounts controller:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get counts'
      });
    }
  }

  /**
   * Get a count by ID
   */
  async getCountById(req: Request, res: Response<CountResponse>): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID format'
        });
        return;
      }

      const count = await countService.getCountById(id);
      
      if (!count) {
        res.status(404).json({
          success: false,
          error: `Count with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: count
      });
    } catch (error) {
      console.error(`Error in getCountById controller:`, error);
      res.status(500).json({
        success: false,
        error: 'Failed to get count'
      });
    }
  }

  /**
   * Create a new count
   */
  async createCount(req: Request, res: Response<CountResponse>): Promise<void> {
    try {
      const { value } = req.body;
      
      // Validate request body
      if (value === undefined || typeof value !== 'number') {
        res.status(400).json({
          success: false,
          error: 'Value must be a number'
        });
        return;
      }

      const createCountDTO: CreateCountDTO = { value };
      const newCount = await countService.createCount(createCountDTO);

      res.status(201).json({
        success: true,
        data: newCount
      });
    } catch (error) {
      console.error('Error in createCount controller:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create count'
      });
    }
  }

  /**
   * Update a count by ID
   */
  async updateCount(req: Request, res: Response<CountResponse>): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { value } = req.body;
      
      // Validate request parameters
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID format'
        });
        return;
      }

      // Validate request body
      if (value === undefined || typeof value !== 'number') {
        res.status(400).json({
          success: false,
          error: 'Value must be a number'
        });
        return;
      }

      const updateCountDTO: UpdateCountDTO = { value };
      const updatedCount = await countService.updateCount(id, updateCountDTO);
      
      if (!updatedCount) {
        res.status(404).json({
          success: false,
          error: `Count with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedCount
      });
    } catch (error) {
      console.error(`Error in updateCount controller:`, error);
      res.status(500).json({
        success: false,
        error: 'Failed to update count'
      });
    }
  }

  /**
   * Delete a count by ID
   */
  async deleteCount(req: Request, res: Response<CountResponse>): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID format'
        });
        return;
      }

      const deletedCount = await countService.deleteCount(id);
      
      if (!deletedCount) {
        res.status(404).json({
          success: false,
          error: `Count with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: deletedCount
      });
    } catch (error) {
      console.error(`Error in deleteCount controller:`, error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete count'
      });
    }
  }

  /**
   * Increment a count by ID
   */
  async incrementCount(req: Request, res: Response<CountResponse>): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID format'
        });
        return;
      }

      const incrementedCount = await countService.incrementCount(id);
      
      if (!incrementedCount) {
        res.status(404).json({
          success: false,
          error: `Count with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: incrementedCount
      });
    } catch (error) {
      console.error(`Error in incrementCount controller:`, error);
      res.status(500).json({
        success: false,
        error: 'Failed to increment count'
      });
    }
  }

  /**
   * Decrement a count by ID
   */
  async decrementCount(req: Request, res: Response<CountResponse>): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid ID format'
        });
        return;
      }

      const decrementedCount = await countService.decrementCount(id);
      
      if (!decrementedCount) {
        res.status(404).json({
          success: false,
          error: `Count with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: decrementedCount
      });
    } catch (error) {
      console.error(`Error in decrementCount controller:`, error);
      res.status(500).json({
        success: false,
        error: 'Failed to decrement count'
      });
    }
  }
}

export default new CountController();

