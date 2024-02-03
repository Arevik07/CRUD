var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();
app.set("view engine", 'ejs')
const mongoose = require('mongoose');
// const { log } = require("console");
const { ObjectId } = require('mongoose').Types;


const connectionString = 'mongodb+srv://arevik:tumo1234@cluster0.sxpqfeb.mongodb.net/Tumo_products';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));



app.get("/", function(req, res){
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
    try {
        var mascots = await mongoose.connection.db.collection('Products').find().toArray();
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
    const price = req.body.price;
    const image = req.body.image;
    const des = req.body.des;
    const uuld = req.body.uuld;
    const loc = req.body.loc;

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
    try {
    const allMovies = await mongoose.connection.db.collection('Products').insertOne(
        {
            name: name,
            price:price,
            image: image,
            description:des,
            uuld: uuld,
            location:loc,
        }
    )
        res.redirect('/')
    } catch (error) {
    console.error('Error retrieving movies:', error);
    } finally {
    mongoose.connection.close();
    }
    })
});

app.get("/delete/:id", function (req, res) {
    var id = req.params.id;
       mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
       const db = mongoose.connection;
       db.on('error', console.error.bind(console, 'Connection error:'));
       db.once('open', async () => {
           try {
               let result = await mongoose.connection.db.collection('Products').deleteOne({_id: new ObjectId(id)});
               res.redirect("/")
           } catch (error) {
               console.error('Error retrieving movies:', error);
           } finally {
               mongoose.connection.close();
           }
       })
});

app.get("/update/:id", function (req, res) {
    var id = req.params.id;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        try {
            let result = await mongoose.connection.db.collection('Products').findOne({_id: new ObjectId(id)});
            res.render('../public/update.ejs', {
                obj: result
            });
        } catch (error) {
            console.error('Error retrieving movies:', error);
        } finally {
            mongoose.connection.close();
        }
    })
});

app.post("/updateData", function (req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const des = req.body.description;
    const uuld = req.body.uuld;
    const loc = req.body.location
    const id = req.body.id


    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once('open', async () => {
        console.log('Connected to MongoDB!');

        try {
            let result = await mongoose.connection.db.collection('Products').updateOne(
                { _id: new ObjectId(id) },
                { $set: { name: name, price: price, image: image, description: des, uuld: uuld, location:loc } }
            );

            res.redirect("/")
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            mongoose.connection.close();
        }
    });
});


app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
