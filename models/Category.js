const mongoose = require('mongoose');

const nestedCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  nestedCategories: [nestedCategorySchema],
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  subCategories: [subCategorySchema],
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' }, // Status field added here
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
