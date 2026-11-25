import { useCallback, useEffect, useRef } from "react";

const MAX_BLUR = 24; // px
const MAX_DIM = 0.35; // background darkening at the bottom of the page

/**
 * A fixed overlay on top of the 3D background whose backdrop blur grows
 * smoothly as the page is scrolled.
 */
export default function ScrollBlur() {
	const ref = useRef<HTMLDivElement>(null);

	const update = useCallback((scroll: number) => {
		const el = ref.current;
		if (!el) return;
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const p = max > 0 ? Math.min(Math.max(scroll / max, 0), 1) : 0;
		// smoothstep for a soft start and end
		const eased = p * p * (3 - 2 * p);
		el.style.setProperty("--scroll-blur", `${(eased * MAX_BLUR).toFixed(2)}px`);
		el.style.setProperty("--scroll-dim", (eased * MAX_DIM).toFixed(3));
	}, []);

	useEffect(() => {
		let frame = 0;
		const onChange = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => update(window.scrollY));
		};
		onChange();
		window.addEventListener("scroll", onChange, { passive: true });
		window.addEventListener("resize", onChange);
		document.addEventListener("astro:page-load", onChange);
		return () => {
			document.removeEventListener("astro:page-load", onChange);
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onChange);
			window.removeEventListener("resize", onChange);
		};
	}, [update]);

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="fixed inset-0 -z-10 pointer-events-none"
			style={{
				backdropFilter: "blur(var(--scroll-blur, 0px))",
				WebkitBackdropFilter: "blur(var(--scroll-blur, 0px))",
				backgroundColor: "rgba(var(--background-rgb), var(--scroll-dim, 0))",
			}}
		/>
	);
}
