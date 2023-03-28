const { connect } = require('mongoose'); // Import mongoose (common js), named import


// Her laves en connection string til vores mongodb server
const conectionString =
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_SERVER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`

connect(conectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Bruges til at oprette en forbindelse til en mongodb server
});

