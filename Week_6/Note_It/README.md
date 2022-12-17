# Note it

**Title**: Note it <br>

## Description

This is a note taking application that writes, saves, and deletes notes. It is a Node.js server-side application that has routes for handling HTTP requests and rendering HTML pages.

### Server-side
- <b> server.js: </b> the entry point for the server-side of the application. This file sets up the express app and defines the routes for the application.
- <b> apiRoutes.js: </b> defines the routes for the API of the application. These routes allow for the retrieval, creation, and deletion of notes.

- <b> htmlRoutes.js: </b> defines the routes for the HTML pages of the application. These routes serve the index.html and notes.html pages to the user.

- <b> db/db.json: </b> a JSON file that stores the notes for the application.

### Client-side
- <b> public/index.html: </b> the home page of the application.
- <b> public/notes.html: </b> the page where users can view, create, and delete notes.
- <b> assets/css/styles.css: </b> contains the styles for the application.
- <b> assets/js/index.js: </b> contains the logic for the frontend of the application. This file handles the rendering of notes, saving of notes, and deleting of notes.


### Key Details
The apiRoutes.js file exports a function that defines routes for handling HTTP requests to the server's API. This function defines four routes:

- A POST route that creates a new note and adds it to the server's data store.
- A POST route that creates a new note without adding it to the server's data store.
- A GET route that retrieves all of the notes from the server's data store.
- A GET route that retrieves a specific note by ID from the server's data store and removes it from the data store.
  
The htmlRoutes.js file exports a function that defines routes for rendering HTML pages. This function defines two routes:

- A GET route that renders the index.html page.
- A GET route that renders the notes.html page.
- The index.html file is the homepage of the application and has a link to the notes.html page. The notes.html file is a template for the note-taking feature of the application. It includes a form for creating and editing notes and a list for displaying the titles of saved notes.
  
The index.js file is the frontend JavaScript file that handles the logic for the note-taking feature of the application. It defines functions for handling various events, such as saving a new note, deleting an existing note, and viewing an existing note. It also includes functions for rendering the list of notes and the active note.

The db.json file is a JSON file that stores the notes data for the application. Each note is represented as a JSON object with properties for the note's ID, title, text, and order.