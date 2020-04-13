const express = require("express");
const path = require("path");
const fs = require("fs");

const noteJSON = require("./db/db.json");

const PORT = 8080;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("./"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// these next code is the routes
// the first one lets you get to the HTML home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirnamem, "./public/index.html"));
});

// the second one leads to the note taking form
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirnamem, "./public/notes.html"));
});

// this the api routes to get all the notes
app.get("/api/notes", (req, res) => {
    res.json(noteJSON);
});

app.post("/api/notes", (req, res) => {
    const lastId = noteJSON.length ? Math.max (...(noteJSON.map(note => note.id))) : 0;
    const id = lastId + 1;
    noteJSON.push( {id, ...req.body} );
    res.json(noteJSON.slice(-1));
});

app.delete('/api/notes/:id', (req, res) => {
    let note = noteJSON.find( ({ id }) => id === JSON.parse(req.params.id));
    // removes object at index of note id
    noteJSON.splice( noteJSON.indexOf(note), 1);
    res.end("Note deleted");
    });

   // ###### Server ######
app.listen(PORT, () => console.log(`App listening on port ${PORT}`)); 