// Require Express, path and the routes folder
const express = require('express');
const path = require('path');
const notes = require('./routes');
const PORT = process.env.PORT || 3001;

const app = express();

//Middleware to use the Notes Route and the public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', notes);
app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Listen to the designated PORT
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});

