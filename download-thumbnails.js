const fs = require('fs');
const path = require('path');

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    const filePath = path.join(__dirname, 'img', filename);
    
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to download ${filename}:`, error.message);
    return false;
  }
}

async function downloadAllThumbnails() {
  try {
    // Read the tools data
    const dataPath = path.join(__dirname, 'data', 'tools.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`📥 Downloading ${data.data.length} thumbnail images...`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const tool of data.data) {
      if (tool.thumbnail && tool.thumbnail.data && tool.thumbnail.data.thumbnails) {
        const thumbnailUrl = tool.thumbnail.data.thumbnails[4].url;
        const assetId = tool.thumbnail.private_hash;
        const filename = `${assetId}.jpg`;
        
        const success = await downloadImage(thumbnailUrl, filename);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
    }
    
    console.log(`\n📊 Download Summary:`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📁 Images saved to: ${path.join(__dirname, 'img')}`);
    
  } catch (error) {
    console.error('❌ Error downloading thumbnails:', error);
  }
}

// Run the download
downloadAllThumbnails(); 