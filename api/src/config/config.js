const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../../.env')});

module.exports = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    mongoose: {
        url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
        options: {
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || 30,
        resetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES || 10,
        verifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES || 10,
    },
};
