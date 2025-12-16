const fs = require('fs');
const path = require('path');

console.log('Current Directory:', process.cwd());
try {
    const express = require('express');
    console.log('Express loaded successfully');
} catch (e) {
    console.error('Failed to load express:', e.message);
}

const distPath = path.join(__dirname, 'dist', 'index.js');
console.log('Dist Index Path:', distPath);
console.log('Exists:', fs.existsSync(distPath));
