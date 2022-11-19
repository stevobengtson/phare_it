const express = require('express');

const app = express();

// Setup middleware

app.use((req, res, next) => {
    next(new Error('Page Not found'));
});

module.exports = app;
