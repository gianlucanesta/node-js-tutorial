const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  return MongoClient.connect(
    "mongodb+srv://gianlucanesta:JqhYo1lxsh4JlbZI@cluster0.h68rwui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
