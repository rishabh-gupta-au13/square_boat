const express=require("express");
require('dotenv').config();
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');
const app=express();
const port=3000
app.use(express.urlencoded({ extended: true, limit: '25mb' }))
app.use(express.json())
app.use(morgan('dev'))
// app.use(morgan('combined', { stream: winston.stream }));
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())

require('./dataAaptor/connection')
app.use(require('./routes/index'))


app.listen(port, () => {
    console.log(`App running on port ${port}`)
  });





