import React, { useState } from "react"
import myApi from "../api/apiHandler"
import { useNavigate } from "react-router-dom"

const CreatePetPage = () => {
	const [formState, setFormState] = useState({
		name: "",
		type: "",
	})
	const navigate = useNavigate()
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const response = await myApi.post("/api/pets", formState, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			console.log(response)
			navigate(`/pets/${response.data.id}`)
		} catch (error) {
			console.log(error)
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
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						value={formState.name}
						onChange={handleChange}
						id="name"
					/>
				</div>

				<div>
					<label htmlFor="type">Type:</label>
					<input
						type="type"
						value={formState.type}
						onChange={handleChange}
						id="type"
					/>
				</div>

				<button>Create Pet</button>
			</form>
		</>
	)
}

export default CreatePetPage
