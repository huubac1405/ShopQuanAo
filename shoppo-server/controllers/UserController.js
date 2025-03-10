const UserService = require('../services/UserService')
const JwtService= require('../services/JwtService')

const createUser = async (req,res) => {
    try{
        console.log(req.body)
        const {name,email,pass,comfirmPass} = req.body
        const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email)
        if(!name || !email || !pass || !comfirmPass)
        {
            return res.status(400).json({
                status:'ERR',
                message:'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(400).json({
                status:'ERR',
                message:'The input is email'
            })
        }else if(comfirmPass !== pass)
        {
            return res.status(400).json({
                status:'ERR',
                message:'The pass is equal comfirmpass'
            })
        }
 
        const result = await UserService.createUser(req.body)
        return res.status(200).json(result)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req,res) => {
    try{
        console.log(req.body)
        const {email,pass} = req.body
        const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email)
        if( !email || !pass)
        {
            return res.status(400).json({
                status:'ERR',
                message:'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(400).json({
                status:'ERR',
                message:'The input is email'
            })
        }
        const result = await UserService.loginUser(req.body)
        const { refresh_token, ...newResult} = result
        res.cookie('refresh_token', refresh_token,{
            HttpOnly: true,
            secure: true,
        })
        return res.status(200).json(result)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateUser = async (req,res) => {
    try{
        const userId = req.params.id 
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status:"ERR",
                message: "the userId is required"
            })
        }
        // console.log("Received data:", data);
        const response = await UserService.updateUser(userId, data)      
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req,res) => {
    try{
        const userId = req.params.id 
        if(!userId){
            return res.status(200).json({
                status:"ERR",
                message: "the userId is required"
            })
        }
        const response = await UserService.deleteUser(userId)      
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser(); // Gọi service
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERROR",
            message: e.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "User ID is required"
            });
        }

        const response = await UserService.getUserById(userId); // Gọi service
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERROR",
            message: e.message
        });
    }
};

const refreshToken = async (req,res) => {
    try {
        const token = req.cookie.refresh_token
        if(!token){
            return res.status(200).json({
                status:"ERR",
                message:"The token is required"
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
    refreshToken
}