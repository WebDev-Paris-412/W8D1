import React, { useState } from "react"
import myApi from "../api/apiHandler"

const SignupPage = () => {
	const [formState, setFormState] = useState({
		username: "",
		email: "",
		password: "",
	})
	const [error, setError] = useState("")
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const response = await myApi.post("/api/auth/signup", formState)
			console.log(response)
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
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						value={formState.username}
						onChange={handleChange}
						id="username"
					/>
				</div>
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

				<button>Signup</button>
			</form>
			{error && <p>{error}</p>}
		</>
	)
}

export default SignupPage
