import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Navbar = () => {
	const { handleLogout, isLoggedIn, user } = useContext(AuthContext)
	return (
		<header>
			<h1>Logo</h1>
			<nav>
				<Link to="/">Home</Link>
				{!isLoggedIn ? (
					<>
						<Link to="/sign-up">Signup</Link>
						<Link to="/login">Login</Link>
					</>
				) : (
					<>
						<Link to={"/pets"}>All Pets</Link>
						<Link to={"/pets/create"}>Create Pet</Link>
						<Link to="/profile">Profile</Link>
						<button onClick={handleLogout}>Logout</button>
						<p>Welcome {user.username}</p>
					</>
				)}
			</nav>
		</header>
	)
}

export default Navbar
