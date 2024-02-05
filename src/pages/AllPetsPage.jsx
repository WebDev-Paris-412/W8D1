import { useState, useEffect } from "react"
import myApi from "../api/apiHandler"
import { Link } from "react-router-dom"

const AllPetsPage = () => {
	const [pets, setPets] = useState(null)
	const [favorites, setFavorites] = useState(null)

	const fetchPetsAndFavorites = async () => {
		try {
			const petResponse = await myApi.get("/api/pets")
			const favoritesResponse = await myApi.get("/api/favorites")
			setFavorites(favoritesResponse.data.map((oneFav) => oneFav.pet))
			setPets(petResponse.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchPetsAndFavorites()
	}, [])

	const addToFavorite = async (id) => {
		try {
			const response = await myApi.post(`/api/favorites/${id}`)
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	const removeFromFavorites = async (id) => {
		try {
			const response = await myApi.delete(`/api/favorites/${id}`)
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	if (!pets) {
		return <p>No pets to display</p>
	}

	return (
		<div>
			<h2>All pets</h2>
			{pets.map((onePet) => {
				const isFavorited = favorites.includes(onePet._id)
				return (
					<article key={onePet._id}>
						<p>Name: {onePet.name}</p>
						<p>Owner: {onePet.owner.username}</p>
						<Link to={`/pets/${onePet._id}`}>Details...</Link>
						{isFavorited ? (
							<button onClick={() => removeFromFavorites(onePet._id)}>★</button>
						) : (
							<button onClick={() => addToFavorite(onePet._id)}>☆</button>
						)}
					</article>
				)
			})}
		</div>
	)
}

export default AllPetsPage
