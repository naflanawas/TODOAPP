// api methods, importing npm packages which we downloaded
var Express = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');

// creating an instance of the express app
var app = Express();
app.use(cors());

// connecting to the database
var CONNECTION_STRING = 'mongodb+srv://adminTODo:TODOapp2024@cluster0.sbesrks.mongodb.net/?retryWrites=true&w=majority';

// Writing db name for mongodb connection
var DATABASENAME = 'todoappdb';
// instantiate mongodb connection
var database;

// express app will listen to the activity on port 
app.listen(5038, () => {
    Mongoclient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error('Failed to connect to the database. Error:', error);
        } else {
            database = client.db(DATABASENAME);
            console.log("Mongodb connection was successful");
        }
    });
})

// api methods to get all data from mongodb
//THE PATHWAY:It's not a file or directory path on your local machine, but a path in the URL that clients use to access your server.
app.get('/api/todoapp/GetNotes', (request, response) => {
    database.collection('todoapplication').find({}).toArray((error, result) => {
        if (error) {
            console.error('Failed to retrieve data. Error:', error);
            response.status(500).send('Failed to retrieve data');
        } else {
            response.send(result);
        }
    });
})

// method to add and delete 
app.post('/api/todoapp/AddNotes',multer().none(), (request, response) => {
    database.collection('todoapplication').count({},function(error,numOfDocs){
        database.collection('todoapplication').insertOne({
            id:(numOfDocs + 1).toString(),
            description:request.body.description
        });
        response.json('added successfully');
            
    })
});

app.delete('/api/todoapp/DeleteNotes',(request, response) => {
    database.collection('todoapplication').deleteOne({
        id:request.query.id
    });
    response.json({message:'Deleted Successfully!'});
})