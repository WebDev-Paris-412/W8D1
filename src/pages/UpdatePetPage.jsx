import React, { useState, useEffect } from "react"
import myApi from "../api/apiHandler"
import { useNavigate, useParams } from "react-router-dom"

const UpdatePetPage = () => {
	const [formState, setFormState] = useState({
		name: "",
		type: "",
	})
	const { petId } = useParams()
	const navigate = useNavigate()

	const fetchOnePet = async () => {
		try {
			const response = await myApi.get(`/api/pets/${petId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			setFormState({ name: response.data.name, type: response.data.type })
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchOnePet()
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const response = await myApi.put("/api/pets/" + petId, formState, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			console.log(response)
			navigate(`/pets/${response.data._id}`)
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

				<button>Update Pet</button>
			</form>
		</>
	)
}

export default UpdatePetPage
