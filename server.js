var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();
app.set("view engine", 'ejs')
const mongoose = require('mongoose');
const { log } = require("console");

const connectionString = 'mongodb+srv://arevik:tumo1234@cluster0.sxpqfeb.mongodb.net/sample_mflix';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));



app.get("/", function(req, res){
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
    try {
        var mascots = await mongoose.connection.db.collection('theaters').find({'location.address.city': 'Bloomington'}).toArray();
        console.log(mascots);
        res.render("../public/form.ejs", {
            info: mascots
        })
    } catch (error) {
    console.error('Error retrieving movies:', error);
    } finally {
    mongoose.connection.close();
    }
    })


});

app.post('/addName', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    console.log(name, password, email);
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
    try {
    const allMovies = await mongoose.connection.db.collection('users').insertOne(
        {
            name: name,
            password:password,
            email: email,
        }
    )
    console.log("All movies", allMovies);
    } catch (error) {
    console.error('Error retrieving movies:', error);
    } finally {
    mongoose.connection.close();
    }
    })
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
