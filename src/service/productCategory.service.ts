import pool from "../db/postgres";

export async function saveCategoryDetalis(categoryData:any):Promise<any>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS products109 (
            id SERIAL PRIMARY KEY,
            categoryName TEXT,
            categoryBrand TEXT,
            ram TEXT,
            storage TEXT,
            battery TEXT
        )
        `);
        const insertResult = await pool.query(
            "INSERT INTO products109 (categoryName, categoryBrand, ram, storage, battery) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            [categoryData.categoryName, categoryData.categoryBrand, categoryData.ram,categoryData.storage,categoryData.battery])
return insertResult
        }