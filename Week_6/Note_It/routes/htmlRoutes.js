// ===============================
// DEPENDENCIES
// ===============================
const path = require("path");
const axios = require("axios");

// ===============================
// ROUTES
// ===============================
module.exports = function(app) {
  axios.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  axios.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
};
