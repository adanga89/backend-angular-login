const express = require('express');
const cors = require('cors');
require('dotenv').config();

//Creador Server Express
const app = express();

//Directorio Publico
app.use( express.static('public'))

//CORS
app.use( cors() );

//Lectura y Parseo del Body
app.use( express.json() );

//ROUTES
app.use( '/api/auth', require('./routes/auth') );

app.listen( process.env.PORT || 4001, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT || 4001 }`);
})