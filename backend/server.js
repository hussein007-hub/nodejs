require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});