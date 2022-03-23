const mongoose = require('mongoose');


const connectionDatabase = async () => { 
    await mongoose.connect('mongodb://localhost:27017/market_app');
}

module.exports = connectionDatabase;