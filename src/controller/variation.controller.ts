import { Request, Response } from 'express';
import pool from "../db/postgres";
import { variations } from '../model/variation.model';


export const createVariation = async (req: Request, res: Response) => {
  const { categoryId, variations }: variations = req.body;
  console.log(categoryId)
  try {
    const result = await pool.query(
      'INSERT INTO variations (category_id, variations) VALUES ($1, $2) RETURNING *',
      [categoryId, JSON.stringify(variations)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create variation' });
  }
};


export const getVariations = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM variations');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch variations' });
  }
};


export const getVariationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM variations WHERE category_id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch variation' });
  }
};


export const updateVariation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryId, variations }: variations = req.body;
  try {
    const result = await pool.query(
      'UPDATE variations SET category_id = $1, variations = $2 WHERE id = $3 RETURNING *',
      [categoryId, JSON.stringify(variations), id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update variation' });
  }
};

export const deleteVariation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM variations WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete variation' });
  }
};
