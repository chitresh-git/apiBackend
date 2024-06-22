const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises'); // Use fs.promises for async file operations

const app = express();
const PORT = process.env.PORT || 5000; // Set a port for your server

// Middleware
app.use(cors()); // Enable CORS for all routes

// Serve static files (optional, if you have other static assets)
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch JSON data based on country and category
app.get('/:country/:category', async (req, res) => {
  const { country, category } = req.params; // Extract country and category parameters

  try {
    let filePath = '';

    // Determine the file path based on country and category
    switch (country) {
      case 'in':
        switch (category) {
          case 'general':
            filePath = 'data/india/in_general.json';
            break;
          case 'sports':
            filePath = 'data/india/in_sports.json';
            break;
          case 'science':
            filePath = 'data/india/in_science.json';
            break;
          case 'health':
            filePath = 'data/india/in_health.json';
            break;
          case 'business':
            filePath = 'data/india/in_business.json';
            break;
          case 'technology':
            filePath = 'data/india/in_technology.json';
            break;
          case 'entertainment':
            filePath = 'data/india/in_entertainment.json';
            break;
          default:
            return res.status(404).json({ error: 'Category not found for country IN' });
        }
        break;


          case 'us':
            switch (category) {
              case 'general':
                filePath = 'data/usa/us_general.json';
                break;
              case 'sports':
                filePath = 'data/usa/us_sports.json';
                break;
              case 'science':
                filePath = 'data/usa/us_science.json';
                break;
              case 'health':
                filePath = 'data/usa/us_health.json';
                break;
              case 'business':
                filePath = 'data/usa/us_business.json';
                break;
              case 'technology':
                filePath = 'data/usa/us_technology.json';
                break;
              case 'entertainment':
                filePath = 'data/usa/us_entertainment.json';
                break;
              default:
                return res.status(404).json({ error: 'Category not found for country IN' });
            }
            break;

      case 'cn':
        filePath = 'data/china/cn_general.json';
        break;
      case 'fr':
        filePath = 'data/france/fr_general.json';
        break;
      case 'jp':
        filePath = 'data/japan/jp_general.json';
        break;
      case 'ru':
        filePath = 'data/russia/ru_general.json';
        break;
      case 'au':
        filePath = 'data/ocenia/au_general.json';
        break;

      default:
        filePath='data/_general.json'
    }

    // Read JSON data from file
    const data = await fs.readFile(path.join(__dirname, filePath), 'utf-8');
    const jsonData = JSON.parse(data);

    // Send JSON response
    res.json(jsonData);
  } catch (error) {
    console.error(`Error reading file for ${country}/${category}:`, error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
