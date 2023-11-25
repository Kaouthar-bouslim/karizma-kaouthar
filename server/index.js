const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
require('dotenv').config();
const cors = require('cors'); // Import cors module


const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect('mongodb://127.0.0.1:27017/recetteKarizma', { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});