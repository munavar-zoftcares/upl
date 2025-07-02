import { Request, Response } from "express";
import { saveCategoryDetalis } from "../service/productCategory.service";

import { Category, categories } from '../model/category.model';
import { CategoryDTO } from '../types/category.types';

//.....
import pool from "../db/postgres";
import { Product } from "../model/product.model";



export async function createProduct(req: Request,res: Response): Promise<void> {
      const { productSlug } = req.params;
      console.log(productSlug)
    try {
     const { name, description, productDetails ,count, price}: Product = req.body;
console.log(name)
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(
      'INSERT INTO products (name, description, count, price) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, description,count,price]
    );
    const productId = result.rows[0].id;

    for (const detail of productDetails) {
      const [[key, value]] = Object.entries(detail);
      await client.query(
        'INSERT INTO product_details (product_id, key, value) VALUES ($1, $2, $3)',
        [productId, key, value]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    if(err instanceof Error){
 await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
    }
   
  } finally {
    client.release();
  }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }


  
// export async function filterProduct(req: Request,res: Response):Promise<any> {
//   const { name, ...details } = req.query;

//   let query = `
//     SELECT p.id, p.name, p.description
//     FROM products p
//   `;
//   const values: any[] = [];
//   let joins = '';
//   let wheres = '';

//   if (name) {
//     values.push(`%${name}%`);
//     wheres += `p.name ILIKE $${values.length}`;
//   }

//   let i = 0;
//   for (const [key, value] of Object.entries(details)) {
//     i++;
//     joins += `JOIN product_details pd${i} ON pd${i}.product_id = p.id AND pd${i}.key = $${values.length + 1} AND pd${i}.value = $${values.length + 2} `;
//     values.push(key, value);
//   }

//   if (wheres || joins) {
//     query += ` ${joins}`;
//     if (wheres) query += ` WHERE ${wheres}`;
//   }

//   try {
//     const result = await pool.query(query, values);

//     const products = await Promise.all(
//       result.rows.map(async (row) => {
//         const details = await pool.query(
//           'SELECT key, value FROM product_details WHERE product_id = $1',
//           [row.id]
//         );
//         return {
//           ...row,
//           productDetails: details.rows.map(d => ({ [d.key]: d.value }))
//         };
//       })
//     );

//     res.json(products);
//   } catch (err) {
//     if(err instanceof Error){
// res.status(500).json({ error: err.message });
//     }
//   }
// };


export async function filterProduct(req: Request,res: Response):Promise<any> {
  const { name, ...details } = req.query;

  let query = `
    SELECT DISTINCT p.id, p.name, p.description, p.count
    FROM products p
  `;
  const values: any[] = [];
  let joins = '';
  let wheres = 'p.count > 0'; // ensure count > 0

  if (name) {
    values.push(`%${name}%`);
    wheres += ` AND p.name ILIKE $${values.length}`;
  }

  let i = 0;
  for (const [key, value] of Object.entries(details)) {
    i++;
    joins += `JOIN product_details pd${i} ON pd${i}.product_id = p.id AND pd${i}.key = $${values.length + 1} AND pd${i}.value = $${values.length + 2} `;
    values.push(key, value);
  }

  query += ` ${joins}`;
  query += ` WHERE ${wheres}`;

  try {
    const result = await pool.query(query, values);

    const products = await Promise.all(
      result.rows.map(async (row) => {
        const detailsResult = await pool.query(
          'SELECT key, value FROM product_details WHERE product_id = $1',
          [row.id]
        );
        const productDetails = detailsResult.rows.map(d => ({ [d.key]: d.value }));
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          count: row.count,
          productDetails,
        };
      })
    );

    res.json(products);
  } catch (err) {
    if(err instanceof Error)res.status(500).json({ error: err.message });
  }
};

  
export async function updateProduct(req: Request,res: Response):Promise<any> {
  const id = parseInt(req.params.id);
  const { name, description, productDetails,count }: Product = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE products SET name = $1, description = $2, count = $3 WHERE id = $4', [
      name,
      description,
      count,
      id
    ]);

    await client.query('DELETE FROM product_details WHERE product_id = $1', [id]);
    for (const detail of productDetails) {
      const [[key, value]] = Object.entries(detail);
      await client.query(
        'INSERT INTO product_details (product_id, key, value) VALUES ($1, $2, $3)',
        [id, key, value]
      );
    }

    await client.query('COMMIT');
    res.json({ message: 'Product updated' });
  } catch (err) {
    if(err instanceof Error){
  await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
    }
  
  } finally {
    client.release();
  }
};

  