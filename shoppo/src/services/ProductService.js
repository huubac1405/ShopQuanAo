import axios from "axios"

export const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`)
    return res.data.data
}