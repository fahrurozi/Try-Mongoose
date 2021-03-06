const mongoose = require('mongoose');

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type : Number,
        min :1,
        max : 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit({
    name: "Apple",
    rating : 7,
    review:"Pretty solid as a fruit"
})

//fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitsSchema //add relationship
})

const Person = mongoose.model("Person", personSchema);


const carrot = new Fruit({
    name: "Carrot",
    rating: 9,
    review : "Karot"
})
carrot.save();


const person = new Person({
    name: "Paijo",
    age : 20,
    favouriteFruit: carrot
})

//person.save();

const kiwi = new Fruit({
    name : "Kiwi",
    rating: 10,
    review: "This is a kiwi"
})

const orange = new Fruit({
    name: "orange",
    rating: 7,
    review: "This is an orange"
})

const banana = new Fruit({
    name : "banana",
    rating: 5,
    review: "This is a banana"
})

//#insert Many Elements
//Fruit.insertMany([kiwi,orange,banana], function(err){
//    if(err){
//        console.log(err)
//    }else{
//        console.log("Succesfully saved all the input to database")
//    }
//})

//#update element
Person.updateOne({name: "John"}, {favouriteFruit:carrot}, function (err){
    if (err){
        console.log(err);
    }else{
        console.log("Succesfully update item");
    }
})

//Person.deleteMany({name:"Angela"}, function (err){
//   if(err){
//        console.log(err)
//    }else{
//        console.log("Succesfuly delete the item wich name is 'Angela'");
//    }
//})

//Fruit.deleteOne({name:"Carrot" }, function (err){
//    if(err){
//        console.log(err);
//    }else{
//        console.log("Succesfuly delete the item");
//    }
//});

Fruit.find(function (err, fruits){
    
    if(err){
        console.log(err);
    }else{
        fruits.forEach(function(fruit) {
            console.log(fruit.name);
            mongoose.connection.close();
        });
    }
})