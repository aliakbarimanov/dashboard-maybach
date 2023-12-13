import axios from "axios"

export const postResetPassword = async (body) => {
    return await axios.post('http://localhost:8000/api/reset-password', body)
}