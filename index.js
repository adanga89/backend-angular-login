const express = require('express');

//Creador Server Express
const app = express();

app.use( '/api/auth', require('./routes/auth') );

app.listen( 4000, () => {
    console.log(`Servidor corriendo en el puerto ${ 4000 }`);
})