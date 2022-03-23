const mongoose = require('mongoose');


const connectionDatabase = async () => { 
    await mongoose.connect('mongodb+srv://rodrigo-admin:j6XqbEtCA5HD27Jl@cluster0.2plds.mongodb.net/market-app');
}


module.exports = connectionDatabase;