# CGI Climate Map Challenge

This repository is a coding challenge for those who want to show their skills in coding and handling geospatial data.

Forked from repository: https://github.com/locationsolutions/climate-map-challenge

Author: Matvei Tikka

## What has been done?
Some basic errors and problems have been fixed in the first place. Then started the process of building up functionality on top of the forked project. 

### Split up on components
Original project was made of main App.js component and one child component named Sidebar. Project has been split on smaller component with following logic:
* App.js is the main component, here data is being loaded and passed to child components.
* Sidebar component. Weather stations are listed here.
* MapView component. Weather stations are also illustrated visually on the map.
* Chart component for displaying temperature from selected station. 

**Component structure:**

![screenshot](https://github.com/matikka96/climate-map-challenge/blob/master/screenshot.png?raw=true)

```
App.js  
  |--Sidebar.jsx    [PINK]
  |--MapView.jsx    [RED]
  |--Chart.jsx      [YELLOW]
```

All the child components are shown in the "Result" sections screenshot surrounded with individual colors.

### Data handling
As mentioned above, App.js component is passing all the information between components. For example if the station is selected from the Sidebar, corresponding stations will be activated in MaView and vice versa. 

When station is selected, Chart component will pop up and weather information will be illustrated there as a line chart. Chart will update automatically if another stations is being selected.

## Installation

Execute following commands:

`npm install`

`npm start`

App is now seen from here: http://localhost:3000