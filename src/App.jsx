import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import IsNotAuthenticated from "./components/Routing/IsNotAuthenticated"
import IsAuthenticated from "./components/Routing/ISAuthenticated"
import AllPetsPage from "./pages/AllPetsPage"
import CreatePetPage from "./pages/CreatePetPage"
import OnePetPage from "./pages/OnePetPage"
import UpdatePetPage from "./pages/UpdatePetPage"
import SocialAuthenticate from "./components/Routing/SocialAuthenticate"

// import "./App.css"

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route element={<IsNotAuthenticated />}>
					<Route path="/sign-up" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>

				<Route element={<IsAuthenticated />}>
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/pets" element={<AllPetsPage />} />
					<Route path="/pets/create" element={<CreatePetPage />} />
					<Route path="/pets/:petId" element={<OnePetPage />} />
					<Route path="/pets/update/:petId" element={<UpdatePetPage />} />
				</Route>

				<Route path="/callback" element={<SocialAuthenticate />} />
			</Routes>
		</>
	)
}

export default App
