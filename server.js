const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = parseInt(process.env.PORT || '8080', 10);
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg']);

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', service: 'piyush-ohri-portfolio' }));
  }

  const safeUrl = decodeURIComponent(req.url.split('?')[0]);
  let relPath = safeUrl === '/' ? '/index.html' : safeUrl;
  let filePath = path.normalize(path.join(PUBLIC_DIR, relPath));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isAsset = ext === '.png' || ext === '.jpg' || ext === '.svg' || ext === '.pdf';

    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': isAsset
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=3600, must-revalidate'
    };

    const acceptEncoding = req.headers['accept-encoding'] || '';
    const rawStream = fs.createReadStream(filePath);

    if (COMPRESSIBLE.has(ext) && acceptEncoding.includes('br')) {
      headers['Content-Encoding'] = 'br';
      headers['Vary'] = 'Accept-Encoding';
      res.writeHead(200, headers);
      rawStream.pipe(zlib.createBrotliCompress()).pipe(res);
    } else if (COMPRESSIBLE.has(ext) && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      headers['Vary'] = 'Accept-Encoding';
      res.writeHead(200, headers);
      rawStream.pipe(zlib.createGzip({ level: 6 })).pipe(res);
    } else {
      res.writeHead(200, headers);
      rawStream.pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Piyush Ohri Portfolio running on http://0.0.0.0:${PORT}`);
});
