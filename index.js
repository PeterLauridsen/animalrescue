require('dotenv').config(); // Import dotenv (common js), default import
const express = require('express'); // Import express (common js)

// import express from 'express'; // Import express (es6)
const cors = require('cors'); // Import cors (common js)

const animals = require('./routes/animals.routes'); // Importerer animals.routes.js (common js)

const app = express(); // Laver en express app godtager requests og responses fra samme port (4000)

require('./database'); // Importerer database.js (es6) (import af db-connection)

app.use(cors()); // Middleware som tillader at vi kan sende requests fra en anden port (3000)

//Routes
app.use("/api/v1", animals); // Middleware som tillader at vi kan sende json data i requests




app.listen(4000, () => {
    console.log('Server is running on port 4000');
})

