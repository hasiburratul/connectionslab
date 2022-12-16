# Call Uno

**Title**: Call Uno<br>
**Category**: Project 3 <br>
**Date**: 10 November <br>
**Deliverable**: CSS | HTML | SASS | React | Javascript | Socket. IO | express | node.js <br>

<img src="Extra/logo512.png" width="600">

[Access Project Here](https://call-uno.herokuapp.com/)

### Project Brief 

This project is a solution to one of my friend group's problems. Uno is a traditional card game for passing the time. From 2 to 8 players can play together using the printed card deck. Sometimes it becomes really difficult to keep track of 108 cards after one game. Besides, we are college students. The existing solution is to play online using the official UNO app or any third party website. However, when you are planning to meet in person and play together, that doesn’t help. So, this game is to supplement the in person playing of the Uno game, replacing the paper cards. The main focus is on making it simple and enjoyable  to use. No signup/login, No scoring system, no ranks, just you and your friends. The game inherits the classic Uno rules.

### Frontend

- Hand of cards will be shown in main playing screen.

- Player can throw the card by sliding them.

- A menu window which will contain **settings**, **about** and any other options.

For simplicity all the states about game will be maintained in App.js file itself


### Backend

- Game Creater will create room which others can join.

- Each room will have room ID, each joining player(client) will be given IDs as well

<p align="center"><img src="./assets/rooms.png" alt="rooms" width="50%"></p>

### Game Development 

### Challenges

The toughest part of this project was to learn react within a limited time. After starting the frontend the major problem that I faced was to make the game light weight and more responsive. Initially the plan was to display the cards as image(png/jpeg). However, this didn't work as expected. Due to the socket connection the game wasn't as responsive as expected. I had to make the cards by svg afterwards to make the game more responsive. The socket connection were pretty simple for the game. I used SASS for the cards animation on the frontend.

### Workflow

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

Due to time limitations I didn't do any play-testing before completing the whole game mechanics. I used 90's generation people on campus first for the play test. From the first group of players my expectations were feedback regarding the game machanics and game flow. In the second and third round of the playtesting targeted audience were gamers on campus. During the second and third round my aim was to take feedback regarding the UI and UX. But as till 3rd round I didn't play tested with any non-gamer and Gen-Z players there was mixed review during the final round of the playtesting from mostly Gen-Z non-gamer players. Most of them actually missed readind the instruction and struggled during their first attempt to play.

However, as the aim of the project was to recreate a 90's version of the tank game, I decided not change the retro look of the tank game. 

**Future Improvements:**

During the last round of the playtesting I received lots of request for a 2 vs 2/ 4 vs 4 round of the game. In future I am planning to include those requests. And there are few bugs in the game when the tank directly moves towards the wall in the beginning of the game. I want to remove those bugs.

### Reflection & Next Step

**Reflection**

I really enjoyed working on this. I regret not working in a group for the project. However, I got plenty of help from my rubber duck during coding the game. Before starting the work the whole project felt really simple. However, as soon as I started making the small blocks of code I realized how complex the game was. Without any game engine, buidling every single element from the bottom up was really difficult. I never thought the hardest part of the game would be determining the bullets movement path. I am now extremely proud of the curving bullet movement path. It was great working with sockets. I am very proud of completion of the project. Although I completed the game, I made mistake starting wiht the ideation of the game. Replicating something from 90's isn't always mean it would be easy to do.
From the project I got a realization that something very simple from outside can be very complicated in practice.
After I finished the project, I just felt massive respect for the last centuries game developers, who coded so many massive games without any game engine. 
