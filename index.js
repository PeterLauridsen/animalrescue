// Import dotenv (common js), default import
require('dotenv').config();

// Import express (common js)
const express = require('express');

// import express from 'express'; // Import express (es6)
const cors = require('cors'); // Import cors (common js)

// Importerer animals.routes.js (common js)
const animals = require('./routes/animals.routes');

// Laver en express app godtager requests og responses fra samme port (4000)
const app = express();

// Importerer database.js (es6) (import af db-connection)
require('./database');

// Serve static files from the app
app.use("/", express.static("docs"))

// Middleware som tillader at vi kan sende requests fra en anden port (3000)
app.use(cors());

// Middleware som tillader at vi kan sende json data i requests
app.use(express.json());

// Middleware som tillader at vi kan sende json data i requests
app.use("/api/v1", animals);


// Laver en server på port 4000 og logger en besked i terminalen når serveren er startet
app.listen(4000, () => {
    console.log('Server is running on port 4000');
})

