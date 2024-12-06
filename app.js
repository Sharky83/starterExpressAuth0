const express = require('express');
const indexRouter = require('./routes/index.js');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
    secret: process.env.SECRET,
};
// Use the auth middleware
app.use(auth(config));

// middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Use the index router
app.use('/', indexRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});