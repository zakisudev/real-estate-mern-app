require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

// Connect Database
connectDB();
const app = express();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(notFound);
app.use(errorHandler);

// Define Routes
app.get('/', (req, res) => res.send('Api is running...'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Listen to port
app.listen(port, () => console.log(`App listening on port ${port}!`));
