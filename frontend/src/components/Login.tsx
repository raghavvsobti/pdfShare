/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUniversalState } from "../context/stateProvider";
import { BASE_URL } from "../../constants";
import AnimatedGradientText from "./AnimatedGradientText";

const Signup = () => {
	const { pathname } = useLocation();
	const [loginMode, setLoginMode] = useState<boolean>(pathname === "/login");
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate()

	const { setUser, setIsLoggedIn, isLoggedIn } = useUniversalState()

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/")
		}
	}, [isLoggedIn])

	const [autoLogin, setAutoLogin] = useState<boolean>(false);

	useEffect(() => {
		if (autoLogin) {
			submitHandler();
		}

		return () => {
			setAutoLogin(false)
		}
	}, [autoLogin])



	const submitHandler = async (e?: any) => {
		e?.preventDefault();

		const formData = new FormData();
		formData.append('username', name);
		formData.append('password', password);

		try {
			const response = await fetch(loginMode ? `${BASE_URL}/auth/login` : `${BASE_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					username: name?.trim()?.toString(),
					password: password?.toString(),
				}),
			});

			// Check if the response is in the correct format before parsing
			if (response?.ok) {
				if (!loginMode) {
					setLoginMode(true)
					setTimeout(() => {
						setAutoLogin(true)
					}, 100);
					return;
				}
				const data = await response?.json();
				if (data.message === "success") {
					localStorage.setItem("token", data?.jwt);
					localStorage.setItem("user", data?.user?.username);
					localStorage.setItem("pdfs", data?.user?.pdfs);
					localStorage.setItem("colorIndex", data?.user?.colorIndex);
					localStorage.setItem("userId", data.user?._id);
					localStorage.setItem("data", JSON.stringify(data.user));
					setUser(data.user);
					setIsLoggedIn(true);
					navigate("/");
				}
			} else {
				// Handle cases where the response is not OK
				const errorText = await response.text();
				console.error("Error response: ", errorText);
			}
		} catch (error) {
			console.error("Error: ", error);
		}
	};


	return (
		<div className="flex font-merriweather justify-center items-center w-full h-[80vh] bg-gradient-to-r from-gray-50 to-gray-white ">
			<div className="w-full max-w-lg">
				<div className=" w-full rounded-lg mb-2 p-4 flex justify-center">
					{/* <h1 className="text-2xl">{loginMode ? "SIGN IN" : "SIGN UP"}</h1> */}
					<AnimatedGradientText>PdfShare</AnimatedGradientText>
				</div>
				<form
					onSubmit={submitHandler}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="name"
						>
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="Username"
							value={name}
							name="name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password2"
							type="password"
							placeholder="Password"
							value={password}
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							onClick={(e) => {
								setLoginMode((prev) => !prev);
								submitHandler(e)
							}}
						>
							{loginMode ? "Sign In" : "Sign Up"}
						</button>
					</div>
				</form>
				<div className="flex justify-center">
					<button
						type="button"
						onClick={() => {
							setLoginMode((prev) => !prev);
						}}
						className="inline-block align-baseline hover:underline font-bold text-sm text-gray-500 hover:text-gray-800"
					>
						{!loginMode ? "Already have an account? Sign in!" : "Don't have an account? Sign up!"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signup;
