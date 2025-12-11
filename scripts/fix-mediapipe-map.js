const fs = require('fs');
const path = require('path');

// Target missing source map inside mediapipe package
const mapPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@mediapipe',
  'tasks-vision',
  'vision_bundle_mjs.js.map'
);

// Ensure parent dir exists before writing
const dir = path.dirname(mapPath);
if (!fs.existsSync(dir)) {
  // If mediapipe isn't installed, nothing to do
  process.exit(0);
}

// Create a minimal stub source map if missing
if (!fs.existsSync(mapPath)) {
  const stub = JSON.stringify({
    version: 3,
    file: 'vision_bundle_mjs.js',
    sources: [],
    names: [],
    mappings: ''
  });

  try {
    fs.writeFileSync(mapPath, stub, 'utf8');
    // eslint-disable-next-line no-console
    console.log('Created stub source map to silence mediapipe warning.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Could not create stub mediapipe source map:', err.message);
  }
}

