require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const user = require('./Routes/user.route'); // Imports routes for the products

// Set up mongoose connection
const mongoose = require('mongoose');
// initialize our express app
const app = express();

const mongoDB = process.env.MONGODB_URI;
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/user', user);

app.get('*', (req, res) => {
  res.json({endpoint:'hello world'});
})

app.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${PORT}`)
})