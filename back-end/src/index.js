const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const cors = require('cors');

mongoose.connect('mongodb+srv://omnistack:root@cluster0-ar9wu.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const app = express();

app.use(cors());
app.use(express.json())
app.use(routes);
app.listen(3333);

