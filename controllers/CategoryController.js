const Category = require('../models/Category');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parentCategory');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Server Error');
  }
};


const getActiveCategories = async (req, res) => {
  try {
    // Fetch only the categories where the status is "active"
    const categories = await Category.find({ status: 'active' }).populate('parentCategory');
    
    // Extract subCategories for each category
    const subCategoriesArray = categories.map(category => category.subCategories);
    
    // Send the array of subCategories as the response
    res.json(subCategoriesArray);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Server Error');
  }
};

// Add a new category
const addCategory = async (req, res) => {
    try {
      const { name, description, parentCategory, subCategories } = req.body;
      
      const category = new Category({
        name,
        description,
        parentCategory: parentCategory ? parentCategory : null,
        subCategories,
      });
      
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error('Error adding category:', error);
      res.status(400).json({ error: 'Error adding category' });
    }
  };
  

// Update an existing category
const updateCategory = async (req, res) => {
    const { id } = req.params; // Ensure you are extracting id from request parameters
  
    if (!id) {
      return res.status(400).json({ error: 'Category ID is required' });
    }
  
    try {
      // Set all categories to inactive
      await Category.updateMany({}, { status: 'inactive' });
  
      // Set the selected category to active
      await Category.findByIdAndUpdate(id, { status: 'active' }, { new: true });
  
      console.log('Testing - Category status updated successfully');
      res.status(200).json({ message: 'Category status updated' });
    } catch (error) {
      console.error('Error updating category status:', error); // Print detailed error
      res.status(500).json({ error: 'Error updating category status', details: error.message });
    }
  };


  const updateCategoryChanges=async (req,res) =>{
    try {
        const categoryId = req.params.id;
        const updatedCategory = req.body; // The new category data
    
        // Find the category by ID and update it with new data
        const category = await Category.findByIdAndUpdate(categoryId, updatedCategory, {
          new: true, // Return the updated document
          runValidators: true // Validate the updated data
        });
    
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
    
        res.status(200).json(category);
      } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Server error' });
      }
  }
  

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCategoryChanges,
  getActiveCategories
};
