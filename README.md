# GPS Tracking Simulation Application

This project is an application that allows you to read GPS coordinates from a PostgreSQL database and display them as a polyline on a web map using Leaflet. It also provides an animation to simulate movements along the polyline and displays additional information in pop-up bubbles during the simulation.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)

## Introduction

The GPS Tracking Simulation Application is built to visualize GPS coordinates data stored in a PostgreSQL database as a polyline on a Leaflet map. The application also includes an animation feature that simulates movements along the polyline, providing a visual representation of the tracked route. Information pop-up bubbles are displayed at various points along the route to provide additional context.

## Technologies Used

- Spring Boot: Back-end framework for building the application	
- PostgreSQL: Database for storing GPS coordinates data
- MapStruct: Object mapping library used for data transformation
- Flyway: Database migration tool
- Leaflet: JavaScript library for interactive web maps
- Angular: Front-end framework for building user interfaces
- HTML, CSS: Markup and styling for the user interface

## Features

- Reads GPS coordinates data from a PostgreSQL database
- Displays GPS points as a polyline on a Leaflet map
- Animates the movement along the polyline to simulate tracking
- Displays pop-up bubbles with additional information during simulation

## Installation

1. Clone the repository to your local machine.
2. Set up the PostgreSQL database and configure the connection in the Spring Boot application.
3. Run database migrations using Flyway to set up the required tables.
4. Build and run the Spring Boot back-end application.
5. Navigate to the "frontend" directory and install dependencies using `npm install`.
6. Run the Angular front-end application using `ng serve`.

## Usage

1. Access the application through your web browser.
2. The map will display the GPS coordinates as a polyline.
3. Click the "Start Simulation" button to animate the movement along the polyline.
4. Pop-up bubbles will display additional information at different points during the simulation.

## Demo

1. Reads GPS coordinates data from a PostgreSQL database
![Arch Demonstration](/assets/Reads_GPS_coordinates.gif)
2. Displays GPS points as a polyline on a Leaflet map
![Arch Demonstration](/assets/Displays_GPS_points_as_a_polyline.gif)
3. Animates the movement along the polyline to simulate tracking with two points and Displays pop-up bubbles with additional
![Arch Demonstration](/assets/Animates_the_movement_pointing.gif)
3. Animates the movement along the polyline to simulate tracking with searching and Displays pop-up bubbles with additional
![Arch Demonstration](/assets/Animates_the_movement_by_searching.gif)

