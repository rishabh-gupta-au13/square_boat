const express = require('express');
const app = express();

let apiPath = '/api/v1';
app.use(`${apiPath}/profile`, require("./profile/profile"));
app.use(`${apiPath}/products`,require("./products/products"));
app.use(`${apiPath}/orders`,require("./order/order"));


module.exports = app;
