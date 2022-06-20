const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    const payload = {uid,name}

    return new Promise( (resolve, reject) => {
        jwt.sign(payload,process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, tkn) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(tkn)
            }
        });
    })

}

module.exports = {
    generarJWT
}