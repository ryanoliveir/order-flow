import fs from 'fs';
import path from 'path';

const distDir = './dist';
const indexPath = path.join(distDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Convert file to Base64 data URI
function fileToDataURI(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mimeMap = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp'
  };
  const mime = mimeMap[ext] || 'application/octet-stream';
  const data = fs.readFileSync(filePath);
  return `data:${mime};base64,${data.toString('base64')}`;
}

// Inline JS
html = html.replace(/<script[^>]*src="([^"]+\.js)"[^>]*><\/script>/g, (match, src) => {
  const jsPath = path.join(distDir, src.replace(/^\//, ''));
  if (fs.existsSync(jsPath)) {
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    fs.unlinkSync(jsPath);
    return `<script type="module">\n${jsContent}\n</script>`;
  }
  return match;
});

// Inline CSS (and convert images inside CSS to Base64)
html = html.replace(/<link[^>]*href="([^"]+\.css)"[^>]*>/g, (match, href) => {
  const cssPath = path.join(distDir, href.replace(/^\//, ''));
  if (fs.existsSync(cssPath)) {
    let cssContent = fs.readFileSync(cssPath, 'utf8');

    // Inline images in CSS
    cssContent = cssContent.replace(/url\(["']?([^)"']+)["']?\)/g, (m, assetUrl) => {
      if (assetUrl.startsWith('data:')) return m; // already inlined
      const assetPath = path.join(distDir, assetUrl.replace(/^\//, ''));
      if (fs.existsSync(assetPath)) {
        return `url("${fileToDataURI(assetPath)}")`;
      }
      return m;
    });

    fs.unlinkSync(cssPath);
    return `<style>\n${cssContent}\n</style>`;
  }
  return match;
});

// Inline images in HTML
html = html.replace(/<img\s+[^>]*src=["']([^"']+)["']/g, (match, src) => {
  if (src.startsWith('data:')) return match; // already inlined
  const imgPath = path.join(distDir, src.replace(/^\//, ''));
  if (fs.existsSync(imgPath)) {
    return match.replace(src, fileToDataURI(imgPath));
  }
  return match;
});

// Delete leftover images from dist
for (const file of fs.readdirSync(distDir)) {
  if (/\.(png|jpe?g|gif|svg|webp)$/i.test(file)) {
    fs.unlinkSync(path.join(distDir, file));
  }
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ HTML único gerado com JS, CSS e imagens embutidos!');
