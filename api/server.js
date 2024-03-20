const path = require('path');
require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 4000;
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const listingRoutes = require('./routes/listing.route');

// Connect Database
connectDB();
const app = express();

// Init Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(notFound);
app.use(errorHandler);

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// API Route
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', function (_, res) {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (_, res) => {
    res.send('API is running...');
  });
}

// Listen to port
app.listen(port, () => console.log(`App listening on port ${port}!`));
