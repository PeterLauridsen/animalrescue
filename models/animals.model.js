const { Schema, model, SchemaTypes } = require('mongoose'); // Import mongoose (common js), named import

const AnimalSchema = new Schema({
    name: SchemaTypes.String,
    species: SchemaTypes.String,
    breed: SchemaTypes.String,
    age: SchemaTypes.Number,
    gender: SchemaTypes.String,
    colors: SchemaTypes.Array,

});

module.exports = model('Animal', AnimalSchema); // Exporterer AnimalSchema som et model med navnet Animal