const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path: './sendgrid.env'});
const emailRoute = require('./routes/email');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('*', cors());
app.use("/api", emailRoute)
const PORT = process.env.PROT || 5001;

// console.log(process.env.SENDGRID_API_KEY);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})