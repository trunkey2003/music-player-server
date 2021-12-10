const mongoose = require("mongoose");

const url = "mongodb+srv://client:client@cluster0.pjbgc.mongodb.net/musicplayer?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(url,{ 
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Succesfully connect to Music Player database");
  } catch (error) {
    console.log("Fail to connect to MongoDB - database : Music Player");
  }
}


module.exports = { connect };
