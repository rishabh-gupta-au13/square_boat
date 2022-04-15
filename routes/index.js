const express = require('express');
const app = express();

let apiPath = '/api/v1';
app.use(`${apiPath}/profile`, require("./profile/profile"));


module.exports = app;
