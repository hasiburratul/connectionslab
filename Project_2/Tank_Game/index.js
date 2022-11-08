// Modules
let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server);
let jquery = require("jquery");

let playerid;
let enemyid;
let inGame = false;

// Set a port for the server to listen
app.set("port", process.env.PORT || 8000);

// Usernames which are currently connected
let usernames = [];

io.on("connection", function (client) {
  let addedUser = false;

  // Game
  client.on("commence game", function (data) {
    inGame = true;
    client.broadcast.to(data.enemy).emit("commence game", data);
    let newData = {
      player: data.enemy,
      playerColor: data.enemyColor,
      enemy: data.player,
      enemyColor: data.playerColor,
    };
    client.emit("commence game", newData);
  });

  client.on("change game state", function (playerID, state) {
    for (let i = 0; i < usernames.length; i++) {
      if (usernames[i].id === playerID) {
        usernames[i].ingame = state;
        client.emit("change game state", playerID, state);
      }
    }
    client.broadcast.emit("user joined", usernames);
    client.emit("user joined", usernames);
  });

  client.on("canvasUpdate", function (data) {
    client.broadcast.to(data.enemy).emit("canvasUpdate", data);
  });

  client.on("takeDamage", function (data) {
    client.broadcast.to(data.enemy).emit("takeDamage", data);
  });

  client.on("iLost", function (data) {
    client.broadcast.to(data.enemy).emit("iLost", data);
  });

  client.on("updateBullets", function (data) {
    client.broadcast.to(data.enemy).emit("updateBullets", data);
  });

  client.on("rematch", function (data) {
    client.broadcast.to(data.enemy).emit("rematch", data);
  });

  client.on("iLeft", function (data) {
    inGame = false;
    client.broadcast.to(data.enemy).emit("iLeft", data);
  });

  // Lobby
  client.on("get users", function (data) {
    client.emit("get users", usernames);
  });

  client.on("send message", function (data) {
    client.broadcast.emit("send message", data);
    client.emit("send message", data);
  });

  client.on("welcome message", function (data) {
    client.emit("welcome message", data);
  });

  client.on("add user", function (username) {
    // add the clients username to the global list of users
    let userObj = {};
    userObj.name = username;
    userObj.id = client.id;
    userObj.ingame = false;
    usernames.push(userObj);
    addedUser = true;
    client.broadcast.emit("user joined", usernames);
    client.emit("user joined", usernames);
  });

  client.on("send challenge", function (data) {
    enemyid = data.enemy;
    playerid = data.player;
    client.broadcast.to(enemyid).emit("send challenge", data);
  });

  // When client's socket disconnects, remove user from
  // array of usernames, and broadcast updated usernames
  client.on("disconnect", function () {
    let otherPlayer;
    // these letiables are misnomers: for one player, player id is himself, but
    // for the other player, player id is the enemy.
    if (enemyid === client.id) otherPlayer = playerid;
    else otherPlayer = enemyid;
    if (inGame) {
      client.broadcast
        .to(otherPlayer)
        .emit("iLeft", { player: client.id, disconnected: true });
    }
    if (addedUser) {
      usernames.forEach(function (object) {
        if (object.id === client.id) {
          usernames.splice(usernames.indexOf(object), 1);
        }
      });
    }
    client.broadcast.emit("user joined", usernames);
    enemyid = null;
    inGame = false;
  });
});

// Load files that are in the public directory
app.use(express.static("public"));

// Make the server listen to the port defined above
server.listen(app.get("port"), function () {
  console.log("Node app is running at localhost:" + app.get("port"));
});
