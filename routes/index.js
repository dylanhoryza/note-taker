// Require Express and the notes.js file
const express = require('express');
const notesRouter = require('./notes');
const app = express();

// Middleware to be aple to use the Notes Route
app.use('/api/notes', notesRouter);

module.exports = app;