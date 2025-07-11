import express from "express"
import multer from "multer"
import * as xlsx from "xlsx";

const upl = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

upl.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    const filePath = req.file?.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = xlsx.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: null
    });

    const nonEmptyRows: any = sheetData.filter((row: any) =>
      row.some((cell: string | null) => cell !== null && cell !== '')
    );
    const headers = nonEmptyRows[0].slice(2);
    const statusRow = nonEmptyRows[1].slice(2);
    const result = [];

    let id = 1;
    for (let i = 2; i < nonEmptyRows.length; i++) {
      const a = nonEmptyRows[i][1];
      if (!a) continue;

      for (let j = 0; j < headers.length; j++) {
        const b = headers[j];
        if (!b) continue;

        const scoreValue = nonEmptyRows[i][j + 2];
        const status = statusRow[j];

        result.push({
          id: id++,
          a: a.toLowerCase(),
          b: b,
          score: (scoreValue * 100).toFixed(2) + '%',
          status: status
        });
      }
    }
    console.log(result);
    res.json(result)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing file.");
  }
});

export default upl