# Note it

**Title**: Note it <br>

## Description

This is a note taking application that writes, saves, and deletes notes. This application uses an Express backend and saves and retrieves note data from a JSON file using the `fs` module. 

  * GET `*` - Return the `index.html` file
  * GET `/notes` - Returns the `notes.html` file
  * GET `/api/notes` - Return all saved notes as JSON.
  * POST `/api/notes` -Recieves a new note, adds it to the `db.json` file, and then returns the new note to the client.
  * DELETE `/api/notes/:id` - The id of a note to delete

