const express = require('express');
//Creador Server Express
const app = express();


//GET
app.get('/', (reuest, response) => {
    console.log("Peticion /");
    response.json({
        ok: true,
    })
})



app.listen( 4000, () => {
    console.log(`Servidor corriendo en el puerto ${ 4000 }`);
})