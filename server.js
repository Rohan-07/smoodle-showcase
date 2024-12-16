import express from 'express';
import multer from 'multer';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const db = new Database('projects.db');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projectName TEXT NOT NULL,
    creatorName TEXT NOT NULL,
    projectUrl TEXT NOT NULL,
    screenshotUrl TEXT NOT NULL,
    dateAdded DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Get all projects
app.get('/api/projects', (req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY dateAdded DESC').all();
  res.json(projects);
});

// Add new project
app.post('/api/projects', upload.single('screenshot'), (req, res) => {
  const { projectName, creatorName, projectUrl } = req.body;
  const screenshotUrl = `/uploads/${req.file.filename}`;

  try {
    const stmt = db.prepare(`
      INSERT INTO projects (projectName, creatorName, projectUrl, screenshotUrl)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run(projectName, creatorName, projectUrl, screenshotUrl);
    res.json({ success: true, message: 'Project added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
