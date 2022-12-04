# ExpressNotes
**Demo:** https://pacific-sierra-87761.herokuapp.com/notes

## Description

Application that writes, saves, and deletes notes. This application uses an Express backend and saves and retrieves note data from a JSON file using the `fs` module.

  * GET `*` - Return the `index.html` file
  * GET `/notes` - Returns the `notes.html` file
  * GET `/api/notes` - Return all saved notes as JSON.
  * POST `/api/notes` -Recieves a new note, adds it to the `db.json` file, and then returns the new note to the client.
  * DELETE `/api/notes/:id` - The id of a note to delete

## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Business Context

For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.

## NPM Dependencies

* express [![npm version](https://img.shields.io/npm/v/express.svg?style=flat)](https://npmjs.org/package/express "View this project on npm")
* axios [![npm version](https://img.shields.io/npm/v/axios.svg?style=flat)](https://npmjs.org/package/axios "View this project on npm")
* body-parser [![npm version](https://img.shields.io/npm/v/body-parser.svg?style=flat)](https://npmjs.org/package/body-parser "View this project on npm")
* fs [![npm version](https://img.shields.io/npm/v/fs.svg?style=flat)](https://npmjs.org/package/fs "View this project on npm")
* path [![npm version](https://img.shields.io/npm/v/path.svg?style=flat)](https://npmjs.org/package/path "View this project on npm")
