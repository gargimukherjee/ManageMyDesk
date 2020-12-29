//Basic Dependencies
const express = require('express');
const cors = require('cors');
const app = express();
const winston = require('winston');

app.use(cors());
app.options('*', cors());

require('./startup/logger');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/apiValidation')();
//require('./startup/prod')(app);

app.use(express.static('public'));
app.use("/public", express.static('public'));

//Setting the port dyanmically using the environment variable
const port = process.env.PORT || 4000;
app.listen(port, () => { winston.info('Application started on port 4000')});