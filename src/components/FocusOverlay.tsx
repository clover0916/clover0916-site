import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { isFocused } from "@/stores/focusStore";
import { isLoading } from "@/stores/loadingStore";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const HINT_DURATION = 5; // seconds
const HINT_SEEN_KEY = "crosshair-hint-seen";

const readHintSeen = () => {
	try {
		return sessionStorage.getItem(HINT_SEEN_KEY) === "1";
	} catch {
		return false;
	}
};

const markHintSeen = () => {
	try {
		sessionStorage.setItem(HINT_SEEN_KEY, "1");
	} catch {
		// storage unavailable: the hint may show again, which is harmless
	}
};

/**
 * Crosshair mode controller.
 * - Enters crosshair mode once loading finishes; the first time in a session
 *   a short-lived hint toast appears in the bottom-right corner.
 * - Esc releases the native cursor; clicking anywhere returns to crosshair mode.
 */
export default function FocusOverlay() {
	const focused = useStore(isFocused);
	const loading = useStore(isLoading);
	const [enabled, setEnabled] = useState(false);
	const [started, setStarted] = useState(false);
	const [showHint, setShowHint] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia(FINE_POINTER);
		const sync = () => {
			setEnabled(mq.matches);
			if (!mq.matches) isFocused.set(false);
		};
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	// Enter crosshair mode the first time the page is ready.
	useEffect(() => {
		if (!enabled || loading || started) return;
		setStarted(true);
		isFocused.set(true);
		if (!readHintSeen()) {
			markHintSeen();
			setShowHint(true);
		}
	}, [enabled, loading, started]);

	useEffect(() => {
		if (!showHint) return;
		const id = window.setTimeout(
			() => setShowHint(false),
			HINT_DURATION * 1000,
		);
		return () => window.clearTimeout(id);
	}, [showHint]);

	useEffect(() => {
		if (!enabled || !started) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				isFocused.set(false);
				setShowHint(false);
			}
		};
		const onPointerDown = () => {
			if (!isFocused.get()) isFocused.set(true);
		};
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("pointerdown", onPointerDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("pointerdown", onPointerDown);
		};
	}, [enabled, started]);

	return (
		<AnimatePresence>
			{showHint && focused && (
				<motion.div
					key="focus-hint"
					role="status"
					className="pointer-events-none fixed right-4 bottom-4 z-9000 w-72 overflow-hidden border border-neutral-600/50 bg-neutral-900/60 backdrop-blur-md shadow-lg"
					initial={{ opacity: 0, y: 16, scale: 0.96 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 8, scale: 0.98 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className="flex items-center gap-3 px-4 py-3 font-inter text-sm text-neutral-300">
						<kbd className="border border-neutral-500 px-1.5 py-0.5 text-xs text-neutral-100">
							Esc
						</kbd>
						<span>Press to release the cursor</span>
					</div>
					<motion.div
						className="h-px origin-left bg-neutral-300/70"
						initial={{ scaleX: 1 }}
						animate={{ scaleX: 0 }}
						transition={{ duration: HINT_DURATION, ease: "linear" }}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
