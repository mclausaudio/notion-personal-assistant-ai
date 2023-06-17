const express = require('express');
const cors = require('cors');

const modelRoutes = require('./routes/modelRoutes');
// const notionRoutes = require('./routes/notionRoutes');

require('dotenv').config();

var corsOptions = {
  origin: ['https://www.notionpersonalassistant.com', 'http://localhost:8000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors(corsOptions));
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
