import { AnimatePresence, motion } from "motion/react";
import type React from "react";

export default function AnimationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
