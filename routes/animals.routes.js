const express = require("express");
const { find, findByIdAndDelete } = require("../models/animals.model");
const router = express.Router()
const Animal = require("../models/animals.model")
const auth = require("../auth_middelware")

// get all animals
// router.get("/animals", async function (request, response, next) {
//     try {

//         let result = await Animal.find();

//         return response.status(200).json(result)

//     } catch (error) {

//         return next(error)

//     }

// })

router.get("/animals", async function (request, response, next) {
    let offset = parseInt(request.query.offset) || 0; // offset is the number of items to skip in the database 
    let limit = parseInt(request.query.limit) || 5; // limit is the number of items to return in the database 

    try {
        let count = (await Animal.find()).length; // count the number of animals in the database
        let results = await Animal.find().skip(offset).limit(limit); // find the animals in the database and skip the offset and limit the number of items to return
        let queryStringNext = `?offset=${offset + limit}&limit=${limit}` // create the next query string 
        let queryStringPrev = null; // create the previous query string

        if (offset > 0) { // if offset is greater than 0
            queryStringPrev =
                `?offset=${offset - limit}&limit=${limit}` // create the previous query string
        }

        let apiUrl = `${request.protocol}://${request.hostname}${request.hostname === 'localhost' ? ":4000" : ''}` // create the api url 
        let apiPath = `${request.baseUrl}${request.path}` // create the api path

        let output = {
            count: count, // the number of animals in the database
            next: offset + limit < count ? `${apiUrl}${apiPath}${queryStringNext}` : null, // if the offset + limit is less than the count then return the next query string else return null
            prev: offset > 0 ? `${apiUrl}${apiPath}${queryStringPrev}` : null, // if the offset is greater than 0 then return the previous query string else return null
            results: results, // the results from the database
            url: `${apiUrl}${apiPath}` // the url of the api 


        }

        return response.status(200).json(output)

    } catch (error) {

        return next(error)

    }

})

// get one animal by id
router.get("/animals/:id", async function (request, response, next) { // :id is a placeholder for the id in the url 
    try {

        let result = await Animal.findById(request.params.id); // request.params.id is the id from the url

        return response.status(201).json(result) // return the result 201 = created

    } catch (error) { // if there is an error

        return next(error) // return the error

    }

})

// create one animal
router.post("/animals", auth, async function (request, response, next) {
    try {
        let result = await Animal.create(request.body); // request.body is the data from the request
        return response.status(201).json(result) // return the result 201 = created

    } catch (error) { // if there is an error

        return next(error) // return the error

    }

})

// update one animal by id
router.patch("/animals/:id", async function (req, res, next) {

    try {
        let animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true }) // request.params.id is the id from the url {new: true} returns the updated animal
        return response.status(200).json(animal) // return the result 200 = ok 

    } catch (error) {

        return next(error)

    }

})


// delete one animal by id
router.delete("/animals/:id", async function (request, response, next) { // :id is a placeholder for the id in the url

    try {
        await Animal.findByIdAndDelete(request.params.id) // request.params.id is the id from the url 
        return response.status(204).end() // return the result 204 = no content

    } catch (error) {
        return next(error)
    }

})








module.exports = router; // export the router so we can use it in index.js