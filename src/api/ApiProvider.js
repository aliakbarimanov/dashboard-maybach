import axios from "axios"

export const postResetPassword = async (body) => {
    return await axios.post("http://localhost:8000/api/reset-password", body)
}

export const postOtp = async (body) => {
    return await axios.post("http://localhost:8000/api/users/verify-otp", body)
}

export const sendNewPass = async (body) => {
    return await axios.post("http://localhost:8000/api/change-password", body)
}