const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const notesFilePath = path.join(__dirname, '../db/db.json');

// Read existing notes from db.json
function readNotes() {
    try {
        const notesData = fs.readFileSync(notesFilePath, 'utf8');
        return JSON.parse(notesData);
    } catch (error) {
        console.error("Error reading notes:", error);
        return [];
    }
}

// writeNotes function with error handling
function writeNotes(notes) {
    try {
        fs.writeFileSync(notesFilePath, JSON.stringify(notes), 'utf8');
    } catch (error) {
        console.error("Error writing notes:", error);
    }
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
