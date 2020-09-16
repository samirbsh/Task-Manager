// initialising the connection
// working with object id's
const { MongoClient, ObjectID } = require("mongodb");

//Defining the connection URl and database
const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
// In mongo db object id's are known as GUId's(Globally Unique Identifier)
// scaling well in distributed system

/**Optional */

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
// Connection to the server
// Callback function will get called when we are connected with the database.
// CRUD Operation
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

    // db.collection('Practise').insertOne({
    //   name: "ABC",
    //   college: 'XYZ',
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert User.')
    //     }
    //     // ops contains all the documents that were inserted
    //     console.log(result.ops)
    // })

    // db.collection("Practise").insertMany([
    //   {
    //     name: "Samir",
    //     college: 'ITER',
    //   },
    //   {
    //     name:'Sakshi',
    //     college: 'ITER',
    //   }],(error,result)=>{
    //     if (error){
    //         return console.log('Unable to insert document');
    //     }
    //     console.log(result.ops)
    // });

    //Fetching Data from Database

    // db.collection('Users').findOne({name:'Samir'},(error,user) =>{
    //     if(error){
    //         return console.log('Unable to retrieve Data from Database.')
    //     }
    //     console.log(user)
    // })

    // Find does not take any callback function as the second argument is
    // instead we get a return value which is pointer to the data in the database.
    // db.collection('Newusers').find({status:true}).toArray((error,users)=>{
    //     if(error){
    //         return console.log('Unable to retrieve Data from Database.')
    //     }
    //     console.log(users)
    // })

    // db.collection('Newusers').find({status:true}).count((error,users)=>{
    //     if(error){
    //         return console.log('Unable to retrieve Data from Database.')
    //     }
    //     console.log(users)
    // })

    //Update
    // const updatePromise = db.collection('Newusers').updateOne({
    //   _id:new ObjectID("5f603921e1ca182bd0b63138")

    // },{$set:{
    //   description:'Web-dev'
    // }})
    // // datas are updated with help of update operators to define the behaviour we want to perform

    // updatePromise.then((result) => {
    //   console.log(result)
    // }).catch((err) => {
    //   console.log(err)
    // })

    // db.collection('Newusers').updateMany({
    //   status:true
    // },{
    //   $set:{
    //     status:false
    //   }
    // }).then((result) => {
    //   console.log(result)
    // }).catch((err)=>{
    //   console.log(err)
    // })


    //delete

    // db.collection('Newusers').deleteMany({
    //   description: 'Big Data'
    // }).then((result) => {
    //   console.log(result)
    // }).catch((err)=>{
    //   console.log(err);
    // })


  }
);
