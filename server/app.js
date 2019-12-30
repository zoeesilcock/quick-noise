const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const playerRoutes = require('./routes/player.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Workaround for running the API on a different port in development.
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
}

// API routes.
app.use('/api', playerRoutes);
app.get('/api/hello', (req, res) => {
  res.send({ response: 'Hello from Quick Noise API' });
});

// Serve the frontend in production.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

module.exports = app;
