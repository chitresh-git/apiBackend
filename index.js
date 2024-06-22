const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Use fs.promises for async file operations

const app = express();
const PORT = process.env.PORT || 5000; // Set a port for your server

// Middleware
app.use(cors()); // Enable CORS for all routes

// Serve static files (optional, if you have other static assets)
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch JSON data based on country
app.get('/:country', async (req, res) => {
  const { country } = req.params; // Extract country parameter

  try {
    let fileName = '';
    
    // Determine the file to read based on the country parameter
    switch (country) {
      case 'in':
        fileName = 'data.json';
        break;
      case 'us':
        fileName = 'data2.json';
        break;
      case 'cn':
        fileName = 'data3.json';
        break;
      default:
        return res.status(404).json({ error: 'Country data not found' });
    }
    
    // Read JSON data from file
    const data = await fs.readFile(path.join(__dirname, fileName), 'utf-8');
    const jsonData = JSON.parse(data);

    // Send JSON response
    res.json(jsonData);
  } catch (error) {
    console.error(`Error reading file for ${country}:`, error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
