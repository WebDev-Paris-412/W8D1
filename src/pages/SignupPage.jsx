import React, { useState } from "react"
import myApi from "../api/apiHandler"

const SignupPage = () => {
	const [formState, setFormState] = useState({
		username: "",
		email: "",
		password: "",
	})
	const [file, setFile] = useState(null)

	const [error, setError] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault()

		const fd = new FormData()

		fd.append("username", formState.username)
		fd.append("email", formState.email)
		fd.append("password", formState.password)
		fd.append("picture", file)

		for (const key of fd.entries()) {
			console.log(key[0], key[1])
		}
		try {
			const response = await myApi.post("/api/auth/signup", fd)
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
			<a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/github`}>
				Login with Github
			</a>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="picture">Picture:</label>
					<input
						type="file"
						id="picture"
						multiple
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</div>
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
