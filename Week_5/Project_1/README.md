# International Space Station Live Tracker

**Title**: International Space Station Live Tracker <br>
**Category**: Project 1 <br>
**Deliverable**: CSS | HTML | Javascript <br>

[Access Project Here](https://hasiburratul.github.io/connectionslab/Week_5/Project_1/)

### Project Brief 

This project involves the creation of a webpage that displays a map of the world and tracks the location of the International Space Station (ISS). The webpage is built using HTML, CSS, and JavaScript, with the use of the Mapbox and ISS APIs. The website contains the following:

- The live tracking of the station
- The visibility range of the station
- The information about current the station crews 
- The location of the sun in the sky
- The live video stream of the earth from the station
- The live tempartature map of the earth

Overall, the project allows users to view the current location of the ISS on a map and see a heatmap representation of temperature data across the globe. The project uses data from the ISS API and the mapbox library to display the map and related functionality. The intended audience of this project is someone interested in the ISS. This website supposed to be a one stop solution for the ISS related basic information.

### Wire Frame

The initial ideas for the wireframes for the index.html and tempmap.html files are as follows:

* <b> Index.html: </b>

- Header section with logo and navigation links
- Main content area displaying the ISS map via an iframe
- Footer section with copyright information

* <b> Map.html: </b>

- Map container div to hold the map
- JavaScript code to initialize the map and add the heatmap layer

### Project Development 

### Challenges

There were several challenges that were encountered during the development of this project. The project required a good understaning of APIs.

- The first challenge was to retrieve the real-time location data of the International Space Station (ISS) using an API. The API that was used for this purpose was the "Where the ISS at?" API, which provided the current latitude, longitude, altitude, velocity and other data of the ISS.

- The second challenge was to integrate the map into the project. For this purpose, the Mapbox API was used for the heatmap, and leaflet was used for the ISS map which allowed the creation of interactive map with custom markers, circles and other features. 

- Another challenge was to properly display the location data of the ISS on the map. The latitude and longitude values needed to be converted into the proper format for the Mapbox API, and the map needed to be centered on the ISS's location.

- The final challenge was to display the data retrieved from the API in a user-friendly manner. This included formatting the data and creating custom icons for the ISS and the Sun.
  
However, the most difficult of the project was to understand the custom interpolateHeatmapLayer.js library, which I used to create the heatmap.

### Workflow

* The index.html file is the main file for the project and it is used to display the user interface for the project.
The CSS file is used to style the index.html file and give it a visually appealing look. 

* The index.html file includes an iframe that displays the map.html file, which contains the map and its related functionality. <
  
* The script.js file is used to fetch data from the International Space Station (ISS) API and display it on the map. 

* The map.js file is used in conjunction with the mapbox library to create and display the interactive map on the map.html file. This file also uses the custom interpolateHeatmapLayer.js library.
  
* The tempmap.html file also includes the interpolateHeatmapLayer.js file, which is used to create the heatmap layer on the map. 


**Key Details of the API and js events:**
- In script.js it initializes an instance of a Leaflet map object and sets the view to a specific latitude and longitude with a specific zoom level. The code also adds a tile layer to the map, which is the base map that is displayed on the map. The code also adds a Terminator plugin to the map, which draws the terminator line on the map. The code also adds a scale control to the map, which displays the scale of the map in metric units. The code also creates a custom icon for the International Space Station (ISS) and adds a marker for the ISS to the map, using the custom icon and the latitude and longitude coordinates from the ISS API. The code also adds a circle marker to the map, with a radius and color determined by the visibility and footprint data from the ISS API. The code also creates a custom icon for the Sun and adds a marker for the Sun to the map, using the custom icon and the latitude and longitude coordinates of the Sun.

- It also defines a function to retrieve the current position of the ISS using the "Where the ISS at?" API. The function makes a fetch request to the API and parses the response as JSON data. The function then destructures the latitude, longitude, solar latitude, solar longitude, visibility, and footprint data from the JSON data. The function then sets the position of the ISS marker and circle marker on the map to the latitude and longitude coordinates of the ISS. The function also sets the position of the Sun marker on the map to the solar latitude and solar longitude coordinates of the Sun, accounting for different scales on the ISS and solar longitude values. The function also sets the view of the map to center on the position of the ISS marker if it is the first call to the function. The function also sets the radius of the circle marker to the visibility data from the ISS API and sets the opacity of the circle marker to 0. The function also sets a timer to call the function again after a specified interval to update the position of the ISS, Sun, and circle marker on the map.

- In map.js it initializes an instance of a Mapbox GL map object and sets the view to a specific latitude and longitude with a specific zoom level. The code also adds a style to the map, which is the base map that is displayed on the map. The code also defines variables for the starting and ending latitude and longitude values for the map, as well as the number of points to generate within that range. The code also generates an array of points with random latitude and longitude values within the specified range and with random values for a property called "val". The code also generates an array of URLs for the OpenWeatherMap API using the latitude and longitude values of the points and a specified API key. The code then makes a fetch request to each URL and parses the response as text data. The code then sets the "val" property of each point to the temperature data from the text data returned by the API. The code then creates an instance of the interpolateHeatmapLayer object using the points array and a specified layer ID, and adds the layer to the map.


### Play-Testing and Feedbacks

As I was sick during the development of the I didn't had chance to play-test the project. However, during the in class preseation of the project I receieved really important feedbacks. Regaridng the color of the heatmap layer, Professor pointed out regarding the accessibility issues of the color choice (green and red). While working on the project I didn't have think of the problem. 

### Reflection & Next Step

**Reflection**

I learnt a lot during the project. Working on this project was a valuable learning experience and allowed me to practice using APIs and creating interactive maps with Mapbox and leaflet.

**Future Improvements:**
Most important improvement would be to change the colors of the heatmap. Other possible future developments for the project could include adding more data layers to the maps, such as weather data or air quality data. Another possibility could be to add more interactive features to the maps, such as the ability to click on a point to display more information about the location or to plot a route between two points. Another idea could be to integrate the maps with other APIs or data sources, such as social media or transportation data.

