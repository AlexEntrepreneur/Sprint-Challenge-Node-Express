const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Project + Actions API</title>
      </head>
      <body>
        <h1>Welcome to my Project + Actions API</h1>
      </body>
    </html>
    `)
});

module.exports = server;
