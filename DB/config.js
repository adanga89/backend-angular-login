const moongose = require('mongoose')

const dbConnection = async() => {
    try {
        
        await moongose.connect(process.env.BD_CNN, {
            // useNewUrlParse: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });

        console.log("Base de Datos Online")
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar la DB");
    }
}

module.exports = {
    dbConnection
}