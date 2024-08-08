const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const {body , validationResult} = require('express-validator');
const app = express(); 

mongoose.connect('mongodb+srv://test:test@cluster0.cbsakub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' , { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const indexRoute = require('./routes/index');
const uploadRoute = require('./routes/upload');
app.use('/', indexRoute);
app.use('/upload', uploadRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
