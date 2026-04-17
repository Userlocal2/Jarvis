const http = require('http');
const fs = require('fs');
const path = require('path');
const { buildAnalysis } = require('./analysis');

const publicDir = path.join(__dirname, '..', 'public');

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/analysis') {
    return send(res, 200, 'application/json; charset=utf-8', JSON.stringify(buildAnalysis()));
  }

  const target = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(publicDir, target);
  if (!filePath.startsWith(publicDir)) return send(res, 403, 'text/plain; charset=utf-8', 'Forbidden');

  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'text/plain; charset=utf-8', 'Not found');
    const ext = path.extname(filePath);
    const types = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8'
    };
    return send(res, 200, types[ext] || 'text/plain; charset=utf-8', data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Analytics app running on http://localhost:${port}`);
});
