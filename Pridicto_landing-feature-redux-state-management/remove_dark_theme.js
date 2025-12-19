const fs = require('fs');
const path = require('path');

function removeDarkThemeClasses(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove all dark: classes and dark mode related code
    content = content.replace(/dark:/g, '');
    content = content.replace(/dark\s*=\s*\{[^}]*\}\s*setDark\s*=\s*\{[^}]*\}/g, 'dark={false} setDark={() => {}}');
    content = content.replace(/\bdark\s*=\s*\{[^}]*\}\b/g, 'dark={false}');
    content = content.replace(/\bsetDark\s*=\s*\{[^}]*\}\b/g, 'setDark={() => {}}');
    
    fs.writeFileSync(filePath, content);
    console.log(`Processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other irrelevant directories
      if (!['node_modules', '.git', 'dist', 'build', '.next', 'out'].includes(file)) {
        processDirectory(fullPath);
      }
    } else if (stat.isFile() && (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css'))) {
      removeDarkThemeClasses(fullPath);
    }
  });
}

// Start processing from src directory
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
  console.log('Dark theme removal completed!');
} else {
  console.log('src directory not found');
}