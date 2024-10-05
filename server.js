const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./transactionRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/transactionDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api', transactionRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
