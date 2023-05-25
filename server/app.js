const express = require('express');
const cors = require('cors');

const modelRoutes = require('./routes/modelRoutes');
// const notionRoutes = require('./routes/notionRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/model', modelRoutes);

// Catch-all route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handling middleware
// app.use(yourErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
