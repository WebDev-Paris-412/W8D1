import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
const ProfilePage = () => {
	const { user } = useContext(AuthContext)
	return <div>Hello {user.username}!</div>
}

export default ProfilePage
