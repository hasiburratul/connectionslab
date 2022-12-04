// ===============================
// DEPENDENCIES
// ===============================
const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// ===============================
// EXPRESS CONFIG
// ===============================
const app = express();
const PORT = process.env.PORT || 3000;
// HTML directory
app.use(express.static('public'))
// Express app data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===============================
// ROUTING
// ===============================
/* require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

module.exports = function(app) {
}
 */
const postPosts = () => {
	
	app.get('/api/notes',function(req, res){
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(notes));
	})

	app.delete('/api/notes/:id', function(req, res){
		console.log(req.params.id)
		var inputId = parseInt(req.params.id);
		console.log('Attempting to remove note #'+inputId)
		res.setHeader('Content-Type', 'application/json');
		if (inputId){
			const filterNotes = notes.filter(function(obj) {
				return obj.id !== inputId; 
			})
			notes = filterNotes
			const writeNotes = JSON.stringify(filterNotes)
			fs.writeFile(__dirname + '/db/db.json', writeNotes, function (err) {
				if (err) throw err;
				console.log(`Added #${req.body.title} : ${req.body.title}`);
			});
		}
		res.send(JSON.stringify(notes));
	})

	app.post('/api/notes',function(req, res){
		res.setHeader('Content-Type', 'application/json');
		// Begin check for existing note by ID
		const inputId = parseInt(req.body.id)
		const noteIdArray = [];
		notes.forEach(function (note) {
			noteIdArray.push(note.id);
		});
		const idCheck = noteIdArray.includes(inputId);
		console.log(req.body.id)
		console.log(idCheck)
		if (idCheck){
			console.log(`ID #${req.body.id} exists, let's update it`)
			// Update existing note
			var filterNotes = notes.filter(function(obj) {
				return obj.id !== inputId; 
			})
			console.log(filterNotes)
			const newNote = new Note(inputId, req.body.title, req.body.text, uniqueOrder())
			filterNotes.push(newNote)
			filterNotes.sort((a, b) => a.order - b.order); // Sort by order ID
			const writeNotes = JSON.stringify(filterNotes)
			fs.writeFile(__dirname + '/db/db.json', writeNotes, function (err) {
				if (err) throw err;
				console.log(`Saved ${req.body.title}`);
			});
			res.send(JSON.stringify(notes));
		} else if (req.body.title){
			const newNote = new Note(uniqueID(),req.body.title, req.body.text, uniqueOrder())
			notes.push(newNote)
			notes.sort((a, b) => a.order - b.order); // Sort by order ID
			const writeNotes = JSON.stringify(notes)
			fs.writeFile(__dirname + '/db/db.json', writeNotes, function (err) {
				if (err) throw err;
				console.log(`Saved ${req.body.title}`);
			});
			res.send(JSON.stringify(notes));
		}
	});
	app.get('/notes',function(req, res){
		res.sendFile(__dirname + '/public/notes.html');
	})
	app.get('/',function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	})
	app.get('*',function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	})
}
postPosts();

// ===============================
// DATA
// ===============================
var notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))
notes.sort((a, b) => a.order - b.order); // Sort by order ID

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
function uniqueOrder(){
	let uniqueArray = []
	for (let index = 0; index < notes.length; index++) {
		uniqueArray.push(notes[index].order)
	}
	let sortArray = []
	sortArray = uniqueArray.sort(function(a, b){return b-a})
	let nextID = ++sortArray[0]
	return parseInt(nextID)
}
function Note(id, title, text, order) {
	this.id = id;
	this.title = title;
	this.text = text;
	this.order = order;
}
// ===============================
// LISTENER
// ===============================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
