# Call Uno

**Title**: Call Uno<br>
**Category**: Project 3 <br>
**Date**: 16 December <br>
**Deliverable**: CSS | HTML | SASS | React | Javascript | Socket. IO | express | node.js <br>

<img src="Extra/logo512.png" width="600">

[Access Project Here](https://call-uno.herokuapp.com/)

### Project Brief 

This project is a solution to one of my friend group's problems. Uno is a traditional card game for passing the time. From 2 to 8 players can play together using the printed card deck. Sometimes it becomes really difficult to keep track of 108 cards after one game. Besides, we are college students. The existing solution is to play online using the official UNO app or any third party website. However, when you are planning to meet in person and play together, that doesn’t help. So, this game is to supplement the in person playing of the Uno game, replacing the paper cards. The main focus is on making it simple and enjoyable  to use. No signup/login, No scoring system, no ranks, just you and your friends. The game inherits the classic Uno rules.

**Key Features:**
- The game is played using a standard deck of Uno cards.
- The game can support multiple players, with a maximum of 10 players per game.
- The game is turn-based, with each player taking a turn to play a card.
- The game ends when a player has no cards left in their hand, and the player with the fewest cards is declared the winner.

### Frontend

- Hand of cards will be shown in main playing screen.

- Player can throw the card by sliding them.
  
- Player can shuffle the cards by clickking on the **shuffle** button.
  
- Player can hide his/her cards by clicking **hide** button. Hiding the cards becomes really important when you are playing    in-person

For simplicity all the states about game will be maintained in App.js file itself


### Backend

- Game Creater will create room which others can join.

- Each room will have room ID, each joining player(client) will be given IDs as well

<p align="center"><img src="./assets/rooms.png" alt="rooms" width="50%"></p>

### Game Development 

### Challenges

The toughest part of this project was to learn react within a limited time. After starting the frontend the major problem that I faced was to make the game light weight and more responsive. Initially the plan was to display the cards as image(png/jpeg). However, this didn't work as expected. Due to the socket connection the game wasn't as responsive as expected. I had to make the cards by svg afterwards to make the game more responsive. The socket connection were pretty simple for the game. I used SASS for the cards animation on the frontend. The other challenge in implementing this project was ensuring that the game state is accurately maintained and synced between all connected clients and handling edge cases and errors, such as when a user tries to perform an action that is not allowed or when a user disconnects unexpectedly.

### Workflow


- A user connects to the server using their web browser and is assigned a unique socket ID. This connection is established using Socket.io, which is imported in "socket.js" and initialized on the Express server in "server.js".

- On the main page, the user can either create a new game or join an existing one. If the user chooses to create a new game, the "makeGame" function is called in "socket.js". This function generates a new room ID and adds the user as the owner and first player of the game. It then adds the game to the state object and updates the mapping objects to associate the user's socket ID, client ID, and room ID with each other.

- If the user chooses to join an existing game, the "joinGame" function is called in "socket.js". This function checks if the specified room ID exists in the state object and if there is space for another player. If so, it adds the user as a player to the game and updates the mapping objects accordingly.

- Once in a game, the user can take various actions, such as drawing a card, playing a card, or selecting a color for a wild card. Each of these actions is handled by a separate function in "socket.js".

- The "drawCard" function is called when a user wants to draw a card. It first checks if it is the user's turn to play and if there are enough cards in the deck stack. If not, it creates a new deck by combining the remaining cards in the deck stack with a full deck of cards and shuffling them using the "shuffle" function in "util.js". The function then adds the appropriate number of cards to the user's hand and updates the current turn to the next player.

- The "playCard" function is called when a user plays a card. It first checks if it is the user's turn to play and if the card played is a valid choice given the current state of the game. If the card played is a "wild" card, the function prompts the user to select a color using the "setColor" function. The function then updates the current turn to the next player and checks if the user has won the game.

- The "setColor" function is called when a user selects a color for a "wild" card. It updates the current color of the game


* <b> Cards Rrepresations in game </b>

Each card in game is represented using two letters. First letter represent color and second one number.

Action cards have first letter as "x" representing no color

```
[
	"r1","r2","r3","r4","r5","r6","r7","r8","r9","rs","rr","rp",
  "g1","g2","g3","g4","g5","g6","g7","g8","g9","gs","gr","gp",
	"b1","b2","b3","b4","b5","b6","b7","b8","b9","bs","br","bp",
	"y1","y2","y3","y4","y5","y6","y7","y8","y9","ys","yr","yp",
	"xc","x4"
]
```

* <b> Game state </b>
  
Three maps/objects are maintained on server

    state
    socketIdToClientId
    clientIdToRoomId

- state

This stores the data about each game mapped to a roomId

- socketIdToClientId

This stores value mapped from socket Id to their client Id

- clientIdToRoomId

This stores value mapped from client Id to their respective room Id

* <b> Single Game </b>

For single game the following data is maintained

```
{
    owner: //id of the owner,
    players: [
        {
            clientId: //client id of this player,
            name: // name of this player,
            cards: // cards owned by this player,
        },
    ],
    deckStack: //array of cards available in deck,
    currentTurn: {
        name: //name of player who should move next,
        clientId: // it's client id,
    },
    stackTop: {
        type: //type of card on top of stack,
        color: //color of card on top of stack,
        number: //number of card on top of stack,
    },
    dir: //direction of play,
    countOfCardsToPick: //number of card to pick,
    activePlus2: //boolean to know if +2 card is supposed to be thrown,
    activePlus4: //boolean to know if +4 card is supposed to be thrown,
}
```

Currently for simplicity the same state is broadcasted to each player


### In Game Socket Events

Details of the in game scokets events can be found in the GameLogic folder with comments. Due to the length of the events code I didn't inlcude the code snippets below.

* <b> Client Side Events </b>

- connect

Fires when a successfull socket connection is made

- welcome 

Fired when server assigns a id to this socket connection

```
{
    clientId: //id assigned by the server
}
```

- toast

Fired when server wants to show a toast message on UI


```
{
    status: //boolean,
    message: //text message
}
```
- stateUpdate

Fires when server wants to update the client UI state


Total game state object
- makeGame

Fires when server creates a new game


```
{
    gameId: //id of the game room
}
```

- chooseColor

Fires when server wants client to choose a new color

- ENDGAME

Fires when any player has won

```
{
    winner: //name of the winner
}
```
* <b> Server Side Events </b>

- makeGame

Fired when a client wants to create a new game

```
{
    clientId: //id of client,
    name: //name of the client
}
```

- joinGame

Fired when a client wants to join a game

```
{
    clientId: //id of client,
    gameId: //id of game he wants to join,
    name: //name of the client
}
```

- playCard

Fired when a player throws a card

```
{
    card: {
        type: //type of card,
        color: //color of card,
        number: //number of card
    }
}
```

- setColor

Fired when a client wants to change color of game

```
{
    color: //chosen color
}
```

- drawCard

Fired when a client wants to pick a card

- disconnecting

Fired when a client has disconnected from the server

### Play-Testing and Feedbacks

Due to time constraints, I did only 2 rounds of the playtesting. As one instance of the game requires a lot of time to play it was really hard to playtest. That's why before in person playtesting, I used differet tabs and tested most of the rules my self. While playtesting it was initially difficult to communicate with the testers about the main objective of the game (the game is to supplement normal in person game replacing the paper cards). After playtesting round I improved the UI and UX of the game. Initially the game didn't show the number of cards in hands of the other players. To make the game more intuitive I decided to change the background color based on the color of the card being played. I made a severe mistake during the playtesting. I gave the tester my devices(android phone, ipad, samsung tab) for testing. Due to which, I completely missed the fact that the gaem doesn't perform smoothly for the iPhones. All the feedbacks from the playtesting were very helpful and positive.


**Future Improvements:**

As the game doesn't work smoothly with iPhones, I would like to change the UI of the game to improve performances. For smaller screen mobile devices I could display a different version of the game with different UI settings. I would like to add a QR code generator to the game. 

### Reflection 
I really enjoyed working in this game. The biggest takeway from the project is that I could use the game in real life. During the development of the game I lerned react and SASS. I am planning to start learning redux properly. I regret that I didn't display this game during the IM showcase. I initially decided not to display thinking the game will not be finished before the deadline. 
