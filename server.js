const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { connect } = require("./server/database/database.js");
const cors = require('cors');

// Setup express app
const app = express();
 // parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({ extended: false })
)
// parse application/json
app.use(
    bodyParser.json()
)
app.use(
    cors()
)
connect();
require('./server/routes')(app);
app.use(bodyParser.json());

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'build')));
app.listen(port, () => console.log(`Server up and running on port ${port}.`));