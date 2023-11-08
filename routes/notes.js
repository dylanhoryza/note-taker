// Require Express and create Router Method
const notes = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

// Get Route for the notes
notes.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', function(err, data){ 
    console.log(data); 
    return res.json(JSON.parse(data));
}); 
})

// Post Route to make a new note
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

// Delete Route to delete a specific note based on the ID
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id; 

  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json('Error reading data');
    } else {
      let parsedData = JSON.parse(data);
      const updatedData = parsedData.filter((note) => note.id !== noteId);

      fs.writeFile('./db/db.json', JSON.stringify(updatedData, null, 4), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          res.status(500).json('Error deleting data');
        } else {
          console.info('Successfully deleted notes!');
          res.status(200).json({ status: 'success', message: 'Note deleted' });
        }
      });
    }
  });
});

module.exports = notes;