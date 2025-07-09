const fs = require('fs');
const path = require('path');

// Directus API configuration
const API_URL = 'https://directus.thegovlab.com/odpl_course';
const COLLECTION = 'odpl_tools';

async function downloadToolsData() {
  try {
    console.log('Fetching tools data from Directus API...');
    
    const response = await fetch(`${API_URL}/items/${COLLECTION}?fields=*.*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Save the raw data
    const outputPath = path.join(__dirname, 'data', 'tools.json');
    
    // Ensure data directory exists
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    console.log(`✅ Downloaded ${data.data.length} tools`);
    console.log(`📁 Data saved to: ${outputPath}`);
    
    // Log some details about the data
    data.data.forEach((tool, index) => {
      console.log(`${index + 1}. ${tool.title} (${tool.category})`);
      if (tool.thumbnail && tool.thumbnail.data) {
        console.log(`   Thumbnail: ${tool.thumbnail.data.thumbnails[4].url}`);
      }
    });
    
    return data;
    
  } catch (error) {
    console.error('❌ Error downloading tools data:', error);
    throw error;
  }
}

// Run the download
downloadToolsData(); 