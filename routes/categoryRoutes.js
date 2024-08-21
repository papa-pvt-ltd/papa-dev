const express = require('express');
const router = express.Router();
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCategoryChanges,
  getActiveCategories
} = require('../controllers/CategoryController');

// Get all categories
router.get('/', getCategories);

router.get('/Active', getActiveCategories);

// Add a new category
router.post('/', addCategory);

// Update a category
router.put('/:id', updateCategory);

router.put('/allCategory/:id',updateCategoryChanges)

// Delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
