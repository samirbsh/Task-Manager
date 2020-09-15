const mongodb = require('mongodb');

// initialising the connection
const MongoClient = mongodb.MongoClient

//Defining the connection URl and database 
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// Connection to the server
// Callback function will get called when we are connected with the database.
MongoClient.connect(connectionUrl,{useNewUrlParser:true, useUnifiedTopology: true},(error,client) =>{
    if(error){
        return console.log('Unable to connect to Database'+error);
    }
    console.log('Successful Connection.')

})