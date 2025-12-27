import { Link } from "react-scroll";

export default function AppBar() {
	return (
		<nav className="appBar">
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
							location.href = "/";
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
							location.href = "/#projects";
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
							location.href = "/#contact";
						}
					}}
				>
					Contact
				</Link>
			</div>
		</nav>
	);
}
