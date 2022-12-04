// ===============================
// DEPENDENCIES
// ===============================
const axios = require("axios");
const fs = require("fs");

// ===============================
// DATA
// ===============================
//var notes = JSON.parse(fs.readFileSync('../db/db.json'))
var notes = [{id:1, note:'hello world'}]

// ===============================
// FUNCTIONS & CLASSES
// ===============================
function uniqueID(){
	let uniqueArray = []
	for (let index = 0; index < notes.length; index++) {
		uniqueArray.push(notes[index].id)
	}
	let sortArray = []
	sortArray = uniqueArray.sort(function(a, b){return b-a})
	let nextID = ++sortArray[0]
	return parseInt(nextID)
}

// ===============================
// ROUTING
// ===============================
module.exports = function(app) {
  const postPosts = () => {

    axios
      .post('/api/notes', {
        id: uniqueID(),
        note: 'Sample note'
      })
      .then((response) => { console.log(response) })
      .catch((error) => { console.error(error) });
    
    axios
      .post('/api/notes')
      .then((response) => { console.log(response) })
      .catch((error) => { console.error(error) });

    axios
      .get("/api/notes")
      .then((response) => { console.log(response) })
      .catch((error) => { console.error(error) });

    axios
      .get("/api/notes/:id", function(req, res) {
        var id = req.params.id;
        notes = JSON.parse(fs.readFileSync(__dirname + '../db/db.json'))
        const updatedNotes = notes.filter(note => note.id != id);
        fs.writeFile(__dirname + '../db/db.json', updatedNotes, function (err) {
          if (err) return console.log(err);
          console.log('Removed ID '+id+' from db.json');
        });
        console.log('Return remaining notes (No ID '+id+')');
      })
      .then(({ data: { updatedNotes } }) => res.json(updatedNotes))
      .catch((error) => { console.error(error) });
    
  }
  postPosts();
}
