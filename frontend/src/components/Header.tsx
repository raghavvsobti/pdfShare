import { useLocation, useNavigate } from "react-router-dom"
import { useUniversalState } from "../context/stateProvider";
import { useEffect } from "react";

const Header = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isLoginPage = pathname === "/login";
	const { isLoggedIn, setIsLoggedIn, setUser, user } = useUniversalState();

	const logout = async () => {
		await fetch(`http://localhost:3000/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		}).then((response) =>
			response
				.json()
				.then((data) => {
					console.log(data, "logout data")
					localStorage.clear();
					setIsLoggedIn(false);
					setUser(undefined);
					navigate("/login");
				})
				.catch((error) => {
					console.error("Error: ", error);
				})
		);
	};

	useEffect(() => {
		const data = localStorage.getItem("data");
		if (user === null && data) {
			setUser(JSON.parse(data))
		}
	}, [setUser, user])


	return (
		<div className="md:px-36 px-4 bg-gray-100 w-full">
			<div className="flex justify-between">
				<h1 className="md:text-3xl text-xl font-bold underline text-red-900 py-3 cursor-pointer" onClick={() => navigate("/")}>
					Pdf Share!
				</h1>
				{isLoginPage ?
					<> </> :
					<button className="text-gray-800 hover:bg-gray-50 transition-all ease-in duration-100 bg-white px-4 py-1 font-semibold rounded-md my-2" onClick={() => !isLoggedIn ? navigate("/login") : logout()}>{isLoggedIn ? "Log out" : "Log in"}</button>}
			</div>
		</div>
	)
}

export default Header