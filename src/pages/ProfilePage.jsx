import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
const ProfilePage = () => {
	const { user } = useContext(AuthContext)
	return (
		<div>
			<img src={user.picture} alt="" />
			<p>Hello {user.username}!</p>
		</div>
	)
}

export default ProfilePage
