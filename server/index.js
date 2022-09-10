const express = require('express');
const fileUpload = require('express-fileupload');
const photosRoutes = require('./photos.routes');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './archivos'
}));

app.use(photosRoutes);

app.use(express.static('images'));

app.listen(3000);
console.log('listening on port 3000');