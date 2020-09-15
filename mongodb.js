// initialising the connection
// working with object id's
const {MongoClient, ObjectID} = require('mongodb');

//Defining the connection URl and database
const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
// Connection to the server
// Callback function will get called when we are connected with the database.
MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to Database" + error);
    }
    // The databse will automatically be created by creating a database name and accessing it
    //Inserting a document in the database is a asynchronous operation.
    //To know whether the operation was successful or not we create a callback function
    const db = client.db(databaseName);
    // db.collection('Users').insertOne({
    //     _id: id,
    //     name : 'Vikram',
    //     age:21
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert User.')
    //     }
    //     // ops contains all the documents that were inserted
    //     console.log(result.ops)
    // })

    // db.collection("users").insertMany([
    //   {
    //     name: "Jen",
    //     age: 28,
    //   },
    //   {
    //     name:'Gunther',
    //     age:25
    //   }
    // ],(error,result)=>{
    //     if (error){
    //         return console.log('Unable to insert document');
    //     }
    //     console.log(result.ops)
    // });

    // db.collection("Newusers").insertMany([{
    //     description:"web-devlopment",
    //     status:true,
    // }, {
    //     description:'Machine-Learning',
    //     status:true,
    // }, {
    //     description:'Big Data',
    //     status:false
    // }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert document');
    //     }
    //     console.log(result.ops)
    // });


  }
);
// In mongo db object id's are known as GU Id's(Globally Unique Identifier) 
// scaling well in distributed system