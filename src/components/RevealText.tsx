"use client";

import { motion } from "motion/react";

interface RevealTextProps {
	text: string;
	className?: string;
	delay?: number;
}

export const RevealText = ({ text, className, delay = 0 }: RevealTextProps) => {
	return (
		<motion.span
			className={`inline-block ${className}`}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			transition={{ staggerChildren: 0.05, delayChildren: delay }}
		>
			{text.split(" ").map((word, index) => (
				<span key={index} className="inline-block whitespace-pre-wrap">
					<span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
						<motion.span
							className="inline-block"
							variants={{
								hidden: { y: "100%" },
								visible: { y: 0 },
							}}
							transition={{
								duration: 0.5,
								ease: [0.33, 1, 0.68, 1],
							}}
						>
							{word}
						</motion.span>
					</span>{" "}
				</span>
			))}
		</motion.span>
	);
};
