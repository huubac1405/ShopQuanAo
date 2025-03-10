import axios from "axios"; 

export const loginUser = async(data)=>{
    const res =  await axios.post(`${import.meta.env.VITE_API_URL}/user/login`,data)
    return res.data
}

export const registerUser = async(data)=>{
    const res =  await axios.post(`${import.meta.env.VITE_API_URL}/user/register`,data)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getById/${id}`, {
        headers: {  
            Authorization: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
