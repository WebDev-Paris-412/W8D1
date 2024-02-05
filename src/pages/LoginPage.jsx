import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import myApi from "../api/apiHandler"

const LoginPage = () => {
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	})
	const { authenticateUser } = useContext(AuthContext)
	const [error, setError] = useState("")
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const response = await myApi.post("/api/auth/login", formState)
			console.log(response)
			localStorage.setItem("token", response.data.authToken)
			await authenticateUser()
		} catch (error) {
			// console.log(error)
			setError(error.response.data.message)
			setTimeout(() => {
				setError("")
			}, 3000)
		}
	}

	const handleChange = (event) => {
		const key = event.target.id
		const value = event.target.value
		setFormState({ ...formState, [key]: value })
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						value={formState.email}
						onChange={handleChange}
						id="email"
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						value={formState.password}
						onChange={handleChange}
						id="password"
					/>
				</div>

				<button>Login</button>
			</form>
			{error && <p>{error}</p>}
		</>
	)
}

export default LoginPage
