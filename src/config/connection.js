const mongoose = require('mongoose');

const DB_URL = `mongodb+srv://admin:admin123@cluster0.u6a6eyt.mongodb.net/`;

const connection = async () => {
  await mongoose.connect(DB_URL)
    .then(()=> {
      console.log(`🟢 MongoDB connected!`)
    })
    .catch((error)=> {
      console.log(`🔴 Fail to connect in MongoDB!\n ${error}`);
    })
}

module.exports = connection;