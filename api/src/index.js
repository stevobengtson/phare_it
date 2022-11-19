const config = require('./config/config');
const mongoose = require('mongoose');
const app = require('./app');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    server = app.listen(config.port);
});

process.on('SIGTERM', () => {
    if (server) {
        server.close();
    }
});
