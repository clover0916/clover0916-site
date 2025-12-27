import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import { useState } from "react";

type Props = {
	href: string;
	content: string;
	thankYou?: boolean;
	disabled?: boolean;
};

export const LinkButton = (props: Props) => {
	const [thankYou, setThankYou] = useState(false);

	const handleClick = () => {
		if (!props.thankYou) {
			return;
		}
		setThankYou(!thankYou);
	};

	const variants = {
		thank: {
			width: [60, 110],
			transition: { duration: 0.3, ease: [0.06, 0.67, 0.4, 0.99] as const },
		},
	};

	return (
		<a
			href={props.href}
			onClick={(e) => {
				if (props.thankYou || props.disabled) {
					e.preventDefault();
				}
			}}
		>
			<button
				type="button"
				className={`border rounded py-2 px-3 hover:bg-black/5 duration-100 flex items-center ${
					thankYou ? "duration-300 bg-green-400 hover:bg-green-400" : ""
				} ${props.disabled ? "opacity-50" : ""}`}
				onClick={handleClick}
				disabled={props.disabled}
			>
				{!thankYou && (
					<FontAwesomeIcon
						icon={faArrowUpRightFromSquare}
						className="pr-2 h-3"
					/>
				)}
				<motion.span
					variants={variants}
					animate={thankYou ? "thank" : ""}
					onAnimationComplete={() => {
						if (thankYou && props.thankYou) {
							location.href = props.href;
						}
					}}
					className="overflow-hidden whitespace-nowrap"
				>
					{thankYou ? "Thank you!" : props.content}
				</motion.span>
			</button>
		</a>
	);
};
