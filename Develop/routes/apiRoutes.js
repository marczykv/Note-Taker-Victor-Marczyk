const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

const notesFilePath = path.join(__dirname, '../db/db.json');

// Read existing notes from db.json
function readNotes() {
    const notesData = fs.readFileSync(notesFilePath, 'utf8');
    return JSON.parse(notesData);
}

// Write notes to db.json with error handling
function writeNotes(notes) {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2), 'utf8');
}

// GET /api/notes - Return all saved notes as JSON
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST /api/notes - Receive a new note, add it to db.json, and return the new note
router.post('/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  const notes = readNotes();
  notes.push(newNote);
  writeNotes(notes);

  res.json(newNote);
});

module.exports = router;
