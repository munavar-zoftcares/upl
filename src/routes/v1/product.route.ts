import Express  from 'express';

import {
  createVariation,
  getVariations,
  getVariationById,
  updateVariation,
  deleteVariation,
} from '../../controller/variation.controller';
import { createProduct, filterProduct, updateProduct } from '../../controller/product.controller';

const product = Express.Router();
//.......
product.post('/', createProduct);
product.get('/filter',filterProduct );
product.get('/:id', getVariationById);
product.put('/:id', updateProduct);
product.delete('/:id', deleteVariation);

export default product;
