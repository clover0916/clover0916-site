import { useStore } from "@nanostores/react";
import { gsap } from "gsap";
import type React from "react";
import { type RefObject, useEffect, useRef } from "react";
import { isFocused } from "@/stores/focusStore";

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

const getMousePos = (
	e: Event,
	container?: HTMLElement | null,
): { x: number; y: number } => {
	const mouseEvent = e as MouseEvent;
	if (container) {
		const bounds = container.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - bounds.left,
			y: mouseEvent.clientY - bounds.top,
		};
	}
	return { x: mouseEvent.clientX, y: mouseEvent.clientY };
};

interface CrosshairProps {
	color?: string;
	containerRef?: RefObject<HTMLElement | null>;
}

const Crosshair: React.FC<CrosshairProps> = ({
	color = "white",
	containerRef = null,
}) => {
	const cursorRef = useRef<HTMLDivElement>(null);
	const lineHorizontalRef = useRef<HTMLDivElement>(null);
	const lineVerticalRef = useRef<HTMLDivElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);

	const mouse = useRef({ x: 0, y: 0 });
	const magneticPos = useRef<{ x: number; y: number } | null>(null);

	const focused = useStore(isFocused);
	// Page-wide crosshair is only active in focus mode (Esc leaves it).
	const active = containerRef ? true : focused;

	// Hide the native cursor while the crosshair is active (page-wide only).
	useEffect(() => {
		if (containerRef || !active) return;
		const root = document.documentElement;
		root.classList.add("crosshair-cursor");
		return () => root.classList.remove("crosshair-cursor");
	}, [containerRef, active]);

	useEffect(() => {
		const handleMouseMove = (ev: Event) => {
			const mouseEvent = ev as MouseEvent;
			mouse.current = getMousePos(mouseEvent, containerRef?.current);
			if (containerRef?.current) {
				const bounds = containerRef.current.getBoundingClientRect();
				if (
					mouseEvent.clientX < bounds.left ||
					mouseEvent.clientX > bounds.right ||
					mouseEvent.clientY < bounds.top ||
					mouseEvent.clientY > bounds.bottom
				) {
					gsap.to(
						[lineHorizontalRef.current, lineVerticalRef.current].filter(
							Boolean,
						),
						{ opacity: 0 },
					);
				} else {
					gsap.to(
						[lineHorizontalRef.current, lineVerticalRef.current].filter(
							Boolean,
						),
						{ opacity: 1 },
					);
				}
			}
		};

		const target: HTMLElement | Window = containerRef?.current || window;
		target.addEventListener("mousemove", handleMouseMove);

		const renderedStyles: {
			[key: string]: { previous: number; current: number; amt: number };
		} = {
			tx: { previous: 0, current: 0, amt: 0.15 },
			ty: { previous: 0, current: 0, amt: 0.15 },
		};

		gsap.set(
			[lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean),
			{ opacity: 0 },
		);

		const onMouseMove = (_ev: Event) => {
			renderedStyles.tx.previous = renderedStyles.tx.current = mouse.current.x;
			renderedStyles.ty.previous = renderedStyles.ty.current = mouse.current.y;

			gsap.to(
				[lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean),
				{
					duration: 0.9,
					ease: "Power3.easeOut",
					opacity: 1,
				},
			);

			requestAnimationFrame(render);

			target.removeEventListener("mousemove", onMouseMove);
		};

		target.addEventListener("mousemove", onMouseMove);

		const enter = (target: HTMLElement) => {
			if (!boxRef.current) return;

			const { width, height, left, top } = target.getBoundingClientRect();

			let centerX = left + width / 2;
			let centerY = top + height / 2;

			if (containerRef?.current) {
				const bounds = containerRef.current.getBoundingClientRect();
				centerX -= bounds.left;
				centerY -= bounds.top;
			}

			magneticPos.current = { x: centerX, y: centerY };

			gsap.to(boxRef.current, {
				width: width + 10,
				height: height + 10,
				opacity: 1,
				scale: 1,
				duration: 0.3,
				ease: "power2.out",
			});
		};

		const leave = () => {
			magneticPos.current = null;
			if (!boxRef.current) return;
			gsap.to(boxRef.current, {
				opacity: 0,
				scale: 0,
				width: 32,
				height: 32,
				duration: 0.3,
				ease: "power2.out",
			});
		};

		const render = () => {
			if (magneticPos.current) {
				const diffX = mouse.current.x - magneticPos.current.x;
				const diffY = mouse.current.y - magneticPos.current.y;
				renderedStyles.tx.current = magneticPos.current.x + diffX * 0.3;
				renderedStyles.ty.current = magneticPos.current.y + diffY * 0.3;
			} else {
				renderedStyles.tx.current = mouse.current.x;
				renderedStyles.ty.current = mouse.current.y;
			}

			for (const key in renderedStyles) {
				const style = renderedStyles[key];
				style.previous = lerp(style.previous, style.current, style.amt);
			}

			if (
				lineHorizontalRef.current &&
				lineVerticalRef.current &&
				boxRef.current
			) {
				gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
				gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
				gsap.set(boxRef.current, {
					x: renderedStyles.tx.previous,
					y: renderedStyles.ty.previous,
				});
			}

			requestAnimationFrame(render);
		};

		// Event delegation so links added later (e.g. after a client-side page
		// navigation) are picked up too.
		const hoverRoot: HTMLElement | Document = containerRef?.current || document;
		let hoveredLink: HTMLElement | null = null;
		const onOver = (e: Event) => {
			const link = (e.target as Element | null)?.closest?.("a");
			if (!link || link === hoveredLink) return;
			hoveredLink = link;
			enter(link);
		};
		const onOut = (e: Event) => {
			if (!hoveredLink) return;
			const next = (e as MouseEvent).relatedTarget as Node | null;
			if (next && hoveredLink.contains(next)) return;
			hoveredLink = null;
			leave();
		};
		const onSwap = () => {
			hoveredLink = null;
			leave();
		};
		hoverRoot.addEventListener("mouseover", onOver);
		hoverRoot.addEventListener("mouseout", onOut);
		document.addEventListener("astro:after-swap", onSwap);

		return () => {
			target.removeEventListener("mousemove", handleMouseMove);
			target.removeEventListener("mousemove", onMouseMove);
			hoverRoot.removeEventListener("mouseover", onOver);
			hoverRoot.removeEventListener("mouseout", onOut);
			document.removeEventListener("astro:after-swap", onSwap);
		};
	}, [containerRef]);

	return (
		<div
			ref={cursorRef}
			className={`${containerRef ? "absolute" : "fixed"} top-0 left-0 w-full h-full pointer-events-none z-10000 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
		>
			<div
				ref={boxRef}
				className="absolute w-8 h-8 border border-white pointer-events-none opacity-0 scale-0 transform -translate-x-1/2 -translate-y-1/2"
				style={{ borderColor: color }}
			/>
			<div
				ref={lineHorizontalRef}
				className="absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2"
				style={{ background: color }}
			/>
			<div
				ref={lineVerticalRef}
				className="absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2"
				style={{ background: color }}
			/>
		</div>
	);
};

export default Crosshair;
