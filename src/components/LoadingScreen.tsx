import { useProgress } from "@react-three/drei";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { isLoading } from "@/stores/loadingStore";

export default function LoadingScreen() {
	const { active, progress } = useProgress();
	const [finished, setFinished] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);

	// Progressを滑らかにするためのSpring
	const smoothProgress = useSpring(0, {
		stiffness: 400,
		damping: 40,
		mass: 1,
		restDelta: 0.001,
	});

	useEffect(() => {
		if (progress === 100) {
			// 一旦95%で止める
			smoothProgress.set(95);

			// 少し待ってから100%にする
			const timer1 = setTimeout(() => {
				smoothProgress.set(100);
			}, 500);

			// 100%になってから少し待ってフェードアウト
			const timer2 = setTimeout(() => {
				setFadeOut(true);
			}, 1200); // 500ms(wait) + 700ms(anim to 100 & wait)

			return () => {
				clearTimeout(timer1);
				clearTimeout(timer2);
			};
		}

		smoothProgress.set(progress);
		setFadeOut(false);
		setFinished(false);
	}, [progress, smoothProgress]);

	useEffect(() => {
		if (fadeOut) {
			// フェードアウトのアニメーション時間待つ (500ms)
			const timer = setTimeout(() => {
				setFinished(true);
				isLoading.set(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [fadeOut]);

	const clipPathValue = useTransform(
		smoothProgress,
		(val) => `inset(0 ${100 - val}% 0 0)`,
	);
	const percentageValue = useTransform(
		smoothProgress,
		(val) => `${Math.round(val)}%`,
	);

	if (finished) return null;

	return (
		<div
			className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-500 ${
				fadeOut ? "opacity-0" : "opacity-100"
			}`}
		>
			<div className="relative w-32 h-32">
				{/* Background (Empty state) */}
				<div
					className="absolute inset-0 w-full h-full bg-white/10"
					style={{
						maskImage: "url(/Clover_Midori_Icon_2026_Outlined_NoMargin.svg)",
						maskSize: "contain",
						maskRepeat: "no-repeat",
						maskPosition: "center",
						WebkitMaskImage:
							"url(/Clover_Midori_Icon_2026_Outlined_NoMargin.svg)",
						WebkitMaskSize: "contain",
						WebkitMaskRepeat: "no-repeat",
						WebkitMaskPosition: "center",
					}}
				/>
				{/* Foreground (Filled state) */}
				<motion.div
					className="absolute inset-0 w-full h-full bg-[#41C474]"
					style={{
						maskImage: "url(/Clover_Midori_Icon_2026_Outlined_NoMargin.svg)",
						maskSize: "contain",
						maskRepeat: "no-repeat",
						maskPosition: "center",
						WebkitMaskImage:
							"url(/Clover_Midori_Icon_2026_Outlined_NoMargin.svg)",
						WebkitMaskSize: "contain",
						WebkitMaskRepeat: "no-repeat",
						WebkitMaskPosition: "center",
						clipPath: clipPathValue,
					}}
				/>
				{/* Percentage Text */}
				<motion.div className="absolute -bottom-12 left-0 right-0 text-center text-[#4C9A6A] font-mono">
					{percentageValue}
				</motion.div>
			</div>
		</div>
	);
}
