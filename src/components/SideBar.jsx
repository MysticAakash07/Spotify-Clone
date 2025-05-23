import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlists";

export default function SideBar({ toggleSidebar }) {
	return (
		<Container>
			<div className="top_links">
				<div className="logo">
					<img
						src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
						alt="spotify"
					/>
				</div>
				<div className="library-mobile" onClick={toggleSidebar}>
					<IoLibrary />
					<span>Your Library</span>
				</div>
				<div className="library-laptop">
					<IoLibrary />
					<span>Your Library</span>
				</div>
			</div>
			<Playlists />
		</Container>
	);
}

const Container = styled.div`
	background-color: black;
	color: #b3b3b3;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	overflow: hidden;

	.top_links {
		display: flex;
		flex-direction: column;
	}

	.logo {
		text-align: center;
		margin: 1rem 0;
		img {
			max-inline-size: 80%;
			block-size: auto;
		}
	}

	.library-mobile {
		display: none;
		flex-direction: row;
		padding: 1rem;
		gap: 1rem;
		align-items: center;
		cursor: pointer;
		font-weight: bold;
		font-size: large;
		transition: 0.3s ease-in-out;
		color: white;
	}

	.library-laptop {
		display: flex;
		flex-direction: row;
		padding: 1rem;
		gap: 1rem;
		align-items: center;
		cursor: pointer;
		font-weight: bold;
		font-size: large;
		transition: 0.3s ease-in-out;
		color: white;
	}

	@media (max-width: 768px) {
		.library-laptop {
			display: none;
		}
		.library-mobile {
			display: flex;
		}
	}
`;
