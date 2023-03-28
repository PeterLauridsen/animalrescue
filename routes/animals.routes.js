const express = require("express")
const router = express.Router()
const Animal = require("../models/animals.model")

// get all animals
router.get("/animals", async function (request, response, next) {
    try {

        let result = await Animal.find();

        return response.status(200).json(result)

    } catch (error) {

        return next(error)

    }

})

// get one animal by id
router.get("/animals/:id", async function (request, response, next) { // :id is a placeholder for the id in the url 
    try {

        let result = await Animal.findById(request.params.id); // request.params.id is the id from the url

        return response.status(200).json(result) // return the result

    } catch (error) { // if there is an error

        return next(error) // return the error

    }

})





module.exports = router;