const axios = require('axios');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

// You can get a free Unsplash API key from https://unsplash.com/developers
const UNSPLASH_ACCESS_KEY = '9FwqetTj8Y4fXRcOnzyzEqzfehwpvL0C55GSH2rzGgE';

const downloadImage = async (url, outputPath) => {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });
    
    await sharp(response.data)
      .resize(800, 600, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toFile(outputPath);
      
    console.log(`Downloaded and processed: ${outputPath}`);
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
  }
};

const searchUnsplash = async (query) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      },
      params: {
        query,
        per_page: 1,
        orientation: 'landscape'
      }
    });
    
    return response.data.results[0]?.urls?.regular;
  } catch (error) {
    console.error('Error searching Unsplash:', error.message);
    return null;
  }
};

const generateImages = async () => {
  // Create directories if they don't exist
  const dirs = [
    'public/images/dishes',
    'public/images/restaurants/logos',
    'public/images/restaurants/covers'
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Download dish images
  for (let i = 1; i <= 25; i++) {
    const imageUrl = await searchUnsplash('food dish');
    if (imageUrl) {
      const outputPath = path.join('public/images/dishes', `dish_${i}.jpg`);
      await downloadImage(imageUrl, outputPath);
    }
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Download restaurant logos
  for (let i = 1; i <= 5; i++) {
    const imageUrl = await searchUnsplash('restaurant logo');
    if (imageUrl) {
      const outputPath = path.join('public/images/restaurants/logos', `restaurant_logo_${i}.jpg`);
      await downloadImage(imageUrl, outputPath);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Download restaurant covers
  for (let i = 1; i <= 5; i++) {
    const imageUrl = await searchUnsplash('restaurant interior');
    if (imageUrl) {
      const outputPath = path.join('public/images/restaurants/covers', `restaurant_cover_${i}.jpg`);
      await downloadImage(imageUrl, outputPath);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

generateImages().catch(console.error); 