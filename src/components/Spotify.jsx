import styled from "styled-components";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Body from "./Body";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
export default function Spotify() {
	const [{ token }, dispatch] = useStateProvider();
	const bodyRef = useRef();
	const [navBackground, setNavBackground] = useState(false);
	const [headerBackground, setHeaderBackground] = useState(false);

	const bodyScrolled = () => {
		bodyRef.current.scrollTop >= 30
			? setNavBackground(true)
			: setNavBackground(false);
		bodyRef.current.scrollTop >= 268
			? setHeaderBackground(true)
			: setHeaderBackground(false);
	};

	useEffect(() => {
		const getUserInfo = async () => {
			// Get user info
			const { data } = await axios.get("https://api.spotify.com/v1/me", {
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			});
			const userInfo = {
				userId: data.id,
				userName: data.display_name,
			};
			dispatch({ type: reducerCases.SET_USER, userInfo });

			// Get Player status
			const response = await axios.get("https://api.spotify.com/v1/me/player", {
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			});

			if (response.status === 204 || response.data === "") return;

			const { is_playing } = response.data;
			const { volume_percent } = response.data.device;
			dispatch({
				type: reducerCases.SET_PLAYER_STATE,
				playerState: is_playing,
			});
			dispatch({ type: reducerCases.SET_VOLUME, volume: volume_percent });
		};
		getUserInfo();
	}, [token, dispatch]);

	useEffect(() => {
		const fetchDevices = async () => {
			try {
				const { data } = await axios.get(
					"https://api.spotify.com/v1/me/player/devices",
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				dispatch({
					type: reducerCases.SET_AVAILABLE_DEVICES,
					devices: data.devices,
				});
			} catch (error) {
				console.error("Error fetching devices", error);
			}
		};

		fetchDevices(); 

		const interval = setInterval(fetchDevices, 10000); 

		return () => clearInterval(interval); 
	}, [token, dispatch]);

	return (
		<Container>
			<div className="spotify_body">
				<SideBar />
				<div className="body" ref={bodyRef} onScroll={bodyScrolled}>
					<NavBar navBackground={navBackground} />
					<div className="body_contents">
						<Body headerBackground={headerBackground} />
					</div>
				</div>
			</div>
			<div className="spotify_footer">
				<Footer />
			</div>
		</Container>
	);
}

const Container = styled.div`
	max-width: 100vw;
	max-height: 100vh;
	overflow: hidden;
	display: grid;
	grid-template-rows: 85vh 15vh;
	.spotify_body {
		display: grid;
		grid-template-columns: 15vw 85vw;
		height: 100%;
		width: 100%;
		background: linear-gradient(transparent, rgba(0, 0, 0, 1));
		background-color: rgb(32, 87, 108);
		.body {
			height: 100%;
			width: 100%;
			overflow: auto;
			&::-webkit-scrollbar {
			width: 0.7rem;
			&-thumb {
				background-color: rgba(255, 255, 255, 0.6);
			}
		}
	}
`;
