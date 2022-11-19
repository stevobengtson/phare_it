const config = require('./config/config');
const mongoose = require('mongoose');

console.log(config.mongoose.url);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log('Connected to Database');
});
