"use client";

import { useRouter } from "next/navigation";
import { Link } from "react-scroll";
import NextLink from "next/link";

export default function AppBar() {
  const router = useRouter();
  return (
    <nav className="appBar">
      <div className="text-xl font-bold">
        <NextLink href="/">Clover_Midori</NextLink>
      </div>
      <div className="sm:flex gap-8 hidden">
        <Link
          className="duration-100 hover:opacity-80 hover:cursor-pointer"
          to="about"
          smooth={true}
          onClick={() => {
            if (location.pathname != "/") {
              location.href = "/";
            } else {
              router.push("/");
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
            if (location.pathname != "/") {
              location.href = "/#projects";
            } else {
              router.push("/#projects");
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
            if (location.pathname != "/") {
              location.href = "/#contact";
            } else {
              router.push("/#contact");
            }
          }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
