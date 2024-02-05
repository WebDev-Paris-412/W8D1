import axios from "axios"

const myApi = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
})

export default myApi