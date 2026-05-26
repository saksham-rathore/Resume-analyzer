const fs = require('fs');
const path = require('path');

const sourcePath = 'C:\\Users\\sam\\.gemini\\antigravity-ide\\brain\\0ede9e5b-963d-4c7e-badb-4bdabe64419e\\halftone_clouds_1779731509941.png';
const destDir = 'd:\\resume-analyzer\\public\\images';
const destPath = path.join(destDir, 'halftone_clouds.png');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created directory:', destDir);
  }

  fs.copyFileSync(sourcePath, destPath);
  console.log('Successfully copied image to:', destPath);
} catch (err) {
  console.error('Failed to copy image:', err.message);
}
