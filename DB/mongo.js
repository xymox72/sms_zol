const MongoClient = require('mongodb').MongoClient;

/*
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
MongoClient.connect(url)
  .then(function (db) { // <- db as first argument
    console.log("res", db)
  })
  .catch(function (err) {})
*/
class MongoDB{
    constructor(connectionString){
        if (String(connectionString).length === 0){
            throw new Error("connectionString пустой");
        }
        this.connectionString = connectionString;
        this.error = null;
        this.db = null;
    }

    
    close(){
        if (this.db){
            this.db.close();
        }
    }

    connect(dbName){
        return new Promise((resolve, reject) =>{
            MongoClient.connect(this.connectionString, (err, db) =>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(db.db(dbName));
                }
            });
        });
    }
}



module.exports = MongoDB;