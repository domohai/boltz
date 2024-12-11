const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
// const { connectDatabase } = require('./utils/db');
// connectDatabase();

// Routes
const apiRoutes = require('./routes'); // Import routes
app.use('/api', apiRoutes);

// Serve static frontend files
const staticDir = path.resolve(__dirname, '../out'); // Adjust to the location of static files
app.use(express.static(staticDir));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
