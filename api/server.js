require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

// Connect Database
connectDB();
const app = express();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.get('/', (req, res) => res.send('Hello World!'));

// Listen to port
app.listen(port, () => console.log(`App listening on port ${port}!`));
