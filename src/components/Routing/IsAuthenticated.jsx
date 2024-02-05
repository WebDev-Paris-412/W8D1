import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const IsAuthenticated = () => {
	const { isLoggedIn, isLoading } = useContext(AuthContext)

	if (isLoading) {
		return <p>Loading</p>
	}

	if (!isLoggedIn) {
		return <Navigate to="/" />
	}

	return <Outlet />
}

export default IsAuthenticated
