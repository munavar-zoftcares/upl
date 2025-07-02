import Express from "express";
import { saveCategoryTemplate } from "../../controller/productCategory";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../controller/productCategory';

const productCategory = Express.Router();

// productCategory.post("/categoryTemplate", saveCategoryTemplate);

//.......
productCategory.get('/', getAllCategories);
productCategory.get('/:id', getCategoryById);
productCategory.post('/', createCategory);
productCategory.put('/:id', updateCategory);
productCategory.delete('/:id', deleteCategory);

export default productCategory;