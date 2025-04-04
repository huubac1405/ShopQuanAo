const jwt = require('jsonwebtoken')
const dotenv = require('dotenv'); 
dotenv.config();

const genneralAccessToken = async(payload) => {
    const access_token = jwt.sign({
        ...payload
    },process.env.ACCESS_TOKEN,{expiresIn: '1d'})

    return access_token
}

const genneralRefreshToken = async(payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })  
    return refresh_token
}


const refreshTokenJwtService =  (token) => {
    return new Promise((resolve,reject)=>{
        try{
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {

                console.log('user',user)
                console.log('token',token)
                if (err) {
                    console.log("JWT Error:", err);
                    return resolve({
                        status: "ERROR",
                        message: "Authentication failed"
                    });
                }
                
                const {payload} = user
                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                });
            });
            
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}