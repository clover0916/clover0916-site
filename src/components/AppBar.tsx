import { navigate } from "astro:transitions/client";
import { Link } from "react-scroll";

export default function AppBar() {
	return (
		<nav className="appBar">
			<div className="absolute inset-0 -z-10 mask-to-t backdrop-blur-lg bg-[rgba(var(--background-rgb),0.5)]" />
			<div className="text-xl font-bold">
				<a href="/">Clover_Midori</a>
			</div>
			<div className="sm:flex gap-8 hidden">
				<Link
					className="duration-100 hover:opacity-80 hover:cursor-pointer"
					to="about"
					smooth={true}
					onClick={() => {
						if (location.pathname !== "/") {
							navigate("/");
						}
					}}
				>
					About
				</Link>
				<Link
					className="duration-100 hover:opacity-80 hover:cursor-pointer"
					to="projects"
					smooth={true}
					onClick={() => {
						if (location.pathname !== "/") {
							navigate("/#projects");
						}
					}}
				>
					Projects
				</Link>
				<Link
					className="duration-100 hover:opacity-80 hover:cursor-pointer"
					to="contact"
					smooth={true}
					onClick={() => {
						if (location.pathname !== "/") {
							navigate("/#contact");
						}
					}}
				>
					Contact
				</Link>
			</div>
		</nav>
	);
}
