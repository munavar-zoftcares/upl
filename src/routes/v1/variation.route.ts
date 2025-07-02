import Express  from 'express';

import {
  createVariation,
  getVariations,
  getVariationById,
  updateVariation,
  deleteVariation,
} from '../../controller/variation.controller';

const variations = Express.Router();

//.......
variations.post('/', createVariation);
variations.get('/', getVariations);
variations.get('/:id', getVariationById);
variations.put('/:id', updateVariation);
variations.delete('/:id', deleteVariation);

export default variations;



// import express from "express"
// import path from "path"
// import multer from "multer"
// import * as xlsx from "xlsx";
// import fs from "fs"


// interface RubricRow {
//   id?: number;
//   "x-axis": string;
//   "y-axis": string;
//   status: string;
//   score: string;
// }

// const upl = express.Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Route to upload and convert Excel file
// upl.post("/uploadd", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   try {
//     const filePath = req.file.path;
//  const workbook = xlsx.readFile(filePath);
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];
// console.log(worksheet)
// // Convert sheet to JSON
// const rows: any[] = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

// // Format and map your output
// const formatted = rows.map((row, index) => ({
//   id: index + 1,
//   "x-axis": row["x-axis"] || row["X-axis"] || row["x"] || "",
//   "y-axis": row["y-axis"] || row["Y-axis"] || row["y"] || "",
//   status: row["status"] || "",
//   score:
//     typeof row["score"] === "number"
//       ? `${row["score"].toFixed(2)}%`
//       : row["score"] || "0.00%",
// }));

// console.log(JSON.stringify(formatted, null, 2));
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error processing file.");
//   }
// });
// export default upl


// import * as xlsx from "xlsx";
// import { join } from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const filePath = join(__dirname, "Munna-ps-rubric.xlsx");
// const workbook = xlsx.readFile(filePath);
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];

// const rows: any[] = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

// interface RubricItem {
//   id: number;
//   "x-axis": string;
//   "y-axis": string;
//   status: string;
//   score: string;
// }

// let result: RubricItem[] = [];
// let idCounter = 1;

// rows.forEach(row => {
//   const combined = row["__EMPTY_1"] ?? "";
//   const parts = combined.split(" + ").map(s => s.trim()).filter(Boolean);

//   // Find last valid score (ignore zeros)
//   const scoreKeys = Object.keys(row).filter(k => k.startsWith("__EMPTY_"));
//   const scores = scoreKeys
//     .map(k => row[k])
//     .filter(val => typeof val === "number" && val > 0);
//   const lastScore = scores.length > 0 ? scores[scores.length - 1] : 0;
//   const score = `${(lastScore * 100).toFixed(2)}%`;
//   const status = lastScore >= 0.5 ? "Good" : lastScore > 0 ? "Poor" : "NO";

//   // Create pairwise combinations of parts
//   for (let i = 0; i < parts.length; i++) {
//     for (let j = i + 1; j < parts.length; j++) {
//       result.push({
//         id: idCounter++,
//         "x-axis": parts[i],
//         "y-axis": parts[j],
//         status,
//         score,
//       });
//     }
//   }
// });

// console.log(JSON.stringify(result, null, 2));








/////////late.........................
   // console.log(worksheet)
// const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
// console.log(rows)
//  const range = xlsx.utils.decode_range(worksheet['!ref'] ?? ''); // fallback if !ref is undefined

// let headers: string[] = [];
// let statusRow: string[] = [];
// let result: {
//   id: number;
//   a: string;
//   b: string;
//   score: string;
//   status: string;
// }[] = [];

// let id = 1;

// // Get headers from row 1 (index 0), starting from column 2 (C)
// for (let c = 2; c <= range.e.c; c++) {
//   const cellRef = xlsx.utils.encode_cell({ c, r: 0 });
//   const value = worksheet[cellRef]?.v ?? `Header_${c}`;
//   headers.push(String(value));
// }

// // Get status from row 2 (index 1)
// for (let c = 2; c <= range.e.c; c++) {
//   const cellRef = xlsx.utils.encode_cell({ c, r: 1 });
//   const value = worksheet[cellRef]?.v ?? '';
//   statusRow.push(String(value));
// }

// // Process nonEmptyRows rows starting from row 3 (index 2)
// for (let r = 2; r <= range.e.r; r++) {
//   const labelCellRef = xlsx.utils.encode_cell({ c: 1, r }); // column B
//   const rowLabel = String(worksheet[labelCellRef]?.v ?? '');

//   for (let c = 2; c <= range.e.c; c++) {
//     const scoreCellRef = xlsx.utils.encode_cell({ c, r });
//     const scoreValue = worksheet[scoreCellRef]?.w ?? ''; // .w gives formatted value like "10.00%"
//     const header = headers[c - 2];
//     const status = statusRow[c - 2];

//     result.push({
//       id: id++,
//       a: rowLabel,
//       b: header,
//       score: String(scoreValue),
//       status: String(status),
//     });
//   }
// }

// console.log(result);
//....................................




























//.............
// const headers = data[0].slice(2);    // b-axis (header values)
// const statusRow = data[1].slice(2);  // status values
// const result = [];

// let id = 1;
// for (let i = 2; i < data.length; i++) {
//   const a = data[i][1];
//   if (!a) continue; // skip if 'a' is null or empty

//   for (let j = 0; j < headers.length; j++) {
//     const b = headers[j];
//     if (!b) continue; // skip if 'b' is null or empty

//     const scoreValue = data[i][j + 2];
//     const status = statusRow[j];

//     result.push({
//       id: id++,
//       a: a.toLowerCase(),
//       b: b,
//       score: (scoreValue * 100).toFixed(2) + '%',
//       status: status
//     });
//   }
// }

// console.log(result);

