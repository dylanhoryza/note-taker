//notes.js file
const notes = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');



notes.get('/', (req, res) => {
  // fs.readFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  fs.readFile('./db/db.json', 'utf8', function(err, data){ 
      
    // Display the file content 
    console.log(data); 
    return res.json(JSON.parse(data));
}); 
})

notes.post('/', (req, res) => {
  console.info(req.body)

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };
    console.log(newNote);
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4),
        (writeErr) => 
        writeErr ? console.error(writeErr) : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  };
});



notes.delete('/:id', (req, res) => {
  console.info(req.body)

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid.v4(),
    };

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.filter(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4),
        (writeErr) => 
        writeErr ? console.error(writeErr) : console.info('Successfully deleted notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  };
});





module.exports = notes;