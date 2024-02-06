import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import useAuth from "../context/useAuth"
import { useParams, Link, useNavigate } from "react-router-dom"
import myApi from "../api/apiHandler"

const OnePetPage = () => {
	const [pet, setPet] = useState(null)
	const { petId } = useParams()
	// const { user } = useContext(AuthContext)
	const { user } = useAuth()
	const navigate = useNavigate()

	const fetchOnePet = async () => {
		try {
			const response = await myApi.get(`/api/pets/${petId}`)
			setPet(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchOnePet()
	}, [])

	const handleDelete = async () => {
		try {
			const response = await myApi.delete(`/api/pets/${petId}`)
			navigate("/pets")
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
	if (!pet) {
		return <p>No pet to display</p>
	}

	const isOwner = user._id === pet.owner

	return (
		<div>
			<h2>{pet.name}</h2>
			<p>type: {pet.type}</p>

			{isOwner && (
				<div>
					<button onClick={handleDelete}>Delete</button>
					<Link to={`/pets/update/${petId}`}>Update pet</Link>
				</div>
			)}
		</div>
	)
}

export default OnePetPage
