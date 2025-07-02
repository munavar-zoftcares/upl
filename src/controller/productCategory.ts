import { Request, Response } from "express";
import { saveCategoryDetalis } from "../service/productCategory.service";

import { Category, categories } from '../model/category.model';
import { CategoryDTO } from '../types/category.types';

//.....
import pool from "../db/postgres";

export async function saveCategoryTemplate(req: Request,res: Response): Promise<void> {
    try {
      const categoryData = req.body
      console.log(categoryData)
      const saveCategory = await saveCategoryDetalis(categoryData)
      res.status(200).send(saveCategory);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  //.....

  export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching category' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { categoryName, description,parentId }: Category = req.body;
  console.log(categoryName)
  try {
    const result = await pool.query(
      // 'INSERT INTO categories (name, description, parentId) VALUES ($1, $2, $3) RETURNING *',
        'INSERT INTO categories (categoryname, parentid) VALUES ($1, $2) RETURNING *',
      [categoryName,parentId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if(err instanceof Error){
      console.log(err)
    }
    res.status(500).json({ error: 'Error creating category' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { categoryName, description }: Category = req.body;
  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};