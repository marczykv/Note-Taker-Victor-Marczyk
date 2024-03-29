const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/src/public'));

// API Routes
app.use('/api', apiRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/public/index.html'));
});

// Serve notes.html for the /notes route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './src/public/notes.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
