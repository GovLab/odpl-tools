# ODPL Tools - Offline Setup

This document explains how to set up the ODPL Tools project to work offline by downloading all data and images locally.

## Prerequisites

- Node.js (version 14 or higher)
- Internet connection (for initial data download)

## Setup Steps

### 1. Download Tools Data

First, download all the tools data from the Directus API:

```bash
node download-tools-data.js
```

This will:
- Fetch all tools data from the Directus API
- Save the data to `data/tools.json`
- Display a summary of downloaded tools

### 2. Download Thumbnail Images

Next, download all thumbnail images:

```bash
node download-thumbnails.js
```

This will:
- Read the tools data from `data/tools.json`
- Download all thumbnail images to the `img/` directory
- Display a summary of successful/failed downloads

### 3. Verify Offline Setup

After running both scripts, you should have:

- `data/tools.json` - Contains all tools data
- `img/` directory - Contains all thumbnail images (named by their asset ID)
- Updated HTML and JavaScript files that load from local files instead of API

### 4. Test the Offline Version

Open `index.html` in a web browser. The site should now work completely offline, loading all data and images from local files.

## File Structure After Setup

```
odpl-tools/
├── data/
│   └── tools.json          # Downloaded tools data
├── img/
│   ├── [asset-id-1].jpg    # Downloaded thumbnails
│   ├── [asset-id-2].jpg
│   └── ...                 # More thumbnail images
├── css/
├── js/
│   └── scripts.js          # Updated to load local data
├── index.html              # Updated to use local images
├── download-tools-data.js  # Script to download data
├── download-thumbnails.js  # Script to download images
└── OFFLINE_SETUP.md        # This file
```

## Troubleshooting

### Images Not Loading
- Ensure the thumbnail download script completed successfully
- Check that image files exist in the `img/` directory
- Verify that the asset IDs in `tools.json` match the image filenames

### Data Not Loading
- Ensure the data download script completed successfully
- Check that `data/tools.json` exists and contains valid JSON
- Open browser developer tools to check for JavaScript errors

### Script Errors
- Make sure you have Node.js installed
- Ensure you have an internet connection for the initial download
- Check that the Directus API is accessible

## Updating Data

To update the offline data with new content from the API:

1. Run `node download-tools-data.js` to get updated data
2. Run `node download-thumbnails.js` to get any new images
3. The site will automatically use the updated local files

## Notes

- The site now works completely offline after the initial setup
- All external API dependencies have been removed
- Images are served locally instead of from the Directus CDN
- The site maintains the same functionality as the online version 