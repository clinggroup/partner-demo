const express = require('express');
const authRoutes = require('./routes/auth');
const webhooksRoutes = require('./routes/webhook');
const config = require('./config');

const app = express();
app.use(express.json({ limit: '10mb' }));

// Register routes
app.use('/auth', authRoutes);
app.use('/webhook', webhooksRoutes);

// Handle errors
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

// Catch 404
app.use((req, res, next) => {
  return res.status(404).json({
    url: req.originalUrl,
    message: 'Not found',
  });
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`)
});