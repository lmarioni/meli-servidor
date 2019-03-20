const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.set('port', 4000 );

//middlewere
app.use(morgan('dev')); //para que me muestre todo en la consola
app.use(bodyParser.json()); //para entender las peticiones json

//routes
require('./routes/itemsRoutes')(app);

//static files aca -> ahora no pq es api

app.listen(app.get('port'), () => {
    console.log('APIREST nodejs express running on 4000');
});