const express = require('express');
const projectsRouter = require('./projects-router.js');
const actionsRouter = require('./actions-router.js');
const server = express();

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

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
