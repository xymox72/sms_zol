const MongoDB = require('../../DB/mongo');
const SMS = require('../models/SMS');
const mongo = new MongoDB("mongodb://localhost:27017/");

class MessageResp{
    constructor(message, status){
        this.message = message;
        this.status = status;
    }
}

class SMSRepository{
     constructor(){
        mongo.connect("info_zol").then(db => this.collection = db.collection("SMS_report"));
        this.result = null;
    }
    
   async Insert(data){
       try{
          const res =  await this.collection.insertOne(data);
          return new MessageResp("Объект добавлен", true);
          
       }
       catch({message}){console.log(message)};
        
   }

async DeleteDub(){
this.collection.sort.aggregate([
        { "$group":{
            "_id": "$_id", dubs:{$push:"$tel"}, count:{$sum:1}
        }},
        
    ]).forEach(e => console.log(e));
  
    
}

  async Get(){
      return await this.collection.find();
   }
   async GetAll(){
    return await this.collection.find().toArray();
}
}

module.exports = SMSRepository;