import React from "react"
import { useSearchParams, Navigate } from "react-router-dom"
import useAuth from "../../context/useAuth"

const SocialAuthenticate = () => {
	const [params, setSearchParams] = useSearchParams()
	const { authenticateUser } = useAuth()

	const token = params.get("token")
	if (!token) {
		return <Navigate to="/sign-up" />
	}
	localStorage.setItem("token", token)
	authenticateUser()
	return <Navigate to={"/"} />
}

export default SocialAuthenticate
