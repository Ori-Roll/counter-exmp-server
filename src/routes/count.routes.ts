import express from 'express';
import countController from '../controllers/count.controller';

const router = express.Router();

/**
 * @route   GET /api/counts
 * @desc    Get all counts
 * @access  Public
 */
router.get('/', countController.getAllCounts.bind(countController));

/**
 * @route   GET /api/counts/:id
 * @desc    Get a count by ID
 * @access  Public
 */
router.get('/:id', countController.getCountById.bind(countController));

/**
 * @route   POST /api/counts
 * @desc    Create a new count
 * @access  Public
 */
router.post('/', countController.createCount.bind(countController));

/**
 * @route   PUT /api/counts/:id
 * @desc    Update a count by ID
 * @access  Public
 */
router.put('/:id', countController.updateCount.bind(countController));

/**
 * @route   DELETE /api/counts/:id
 * @desc    Delete a count by ID
 * @access  Public
 */
router.delete('/:id', countController.deleteCount.bind(countController));

/**
 * @route   PATCH /api/counts/:id/increment
 * @desc    Increment a count by ID
 * @access  Public
 */
router.patch('/:id/increment', countController.incrementCount.bind(countController));

/**
 * @route   PATCH /api/counts/:id/decrement
 * @desc    Decrement a count by ID
 * @access  Public
 */
router.patch('/:id/decrement', countController.decrementCount.bind(countController));

export default router;

