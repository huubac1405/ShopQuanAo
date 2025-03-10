const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const {name,email,pass,comfirmPass} = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status:"OK",
                    message:"The email is already"
                })
            }
            const hash = bcrypt.hashSync(pass,10)
            
            const createdUser = await User.create({
                name,
                email,
                pass : hash              
            })
            if(createdUser)
            {
                resolve({
                    status:"OK",
                    message:"success",
                    data: createdUser
                })
            }
            resolve({})
        }catch(e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async(resolve, reject) => {
        const {email,pass} = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser == null){
                resolve({
                    status:"OK",
                    message:"The user is not defined"
                })
            }
            const compearePass = bcrypt.compareSync(pass, checkUser.pass)
            if(!compearePass)
            {
                resolve({
                    status:"ERR",
                    message:"The pass or user is incoeerct "
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            
            resolve({
                status:"OK",
                message:"login complete",
                id: checkUser.id,
                access_token,
                refresh_token
            })
        }catch(e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkuser', checkUser)
            if(checkUser === null){
                resolve({
                    status:"OK",
                    message:"The user not defined"
                })
            }

            if (data.pass) {
                data.pass = bcrypt.hashSync(data.pass,10)
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            console.log('updateUser',updatedUser);

            resolve({
                status:"OK",
                message:"SUCCESS",
                data:updatedUser
            })
        }catch(e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkuser', checkUser)
            if(checkUser === null){
                return resolve({
                    status:"OK",
                    message:"The user not defined"
                })
            }

            const deletedUser = await User.findByIdAndDelete(id)

            resolve({
                status:"OK",
                message:"SUCCESS",             
            })
        }catch(e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find(); // Lấy tất cả user từ DB
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: users
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id); // Tìm user theo ID
            if (!user) {
                return resolve({
                    status: "ERR",
                    message: "User not found"
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserById
}