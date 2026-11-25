"use client";

import {
	faDiscord,
	faGithub,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
	faArrowUpRightFromSquare,
	faCheck,
	faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@nanostores/react";
import { SpeakerHighIcon } from "@phosphor-icons/react";
import { animated } from "@react-spring/web";
import type { GetImageResult } from "astro";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { featuredWorks, history, skills } from "@/data/portfolio";
import { isLoading as isLoadingStore } from "@/stores/loadingStore";
import { RevealText } from "./RevealText";

type IconProps = {
	style?: React.CSSProperties;
	image?: GetImageResult;
};

const Icon = ({ image, ...props }: IconProps) => (
	<img
		className="rounded-full shadow-lg"
		src={image?.src}
		{...image?.attributes}
		width={200}
		height={200}
		{...props}
		alt="Clover_Midori"
	/>
);

const AnimatedBorder = ({
	delay = 0,
	className = "",
	trigger = true,
}: {
	delay?: number;
	className?: string;
	trigger?: boolean;
}) => (
	<motion.div
		className={`h-px w-full bg-neutral-600/50 origin-left ${className}`}
		initial={{ scaleX: 0 }}
		whileInView={trigger ? { scaleX: 1 } : undefined}
		viewport={{ once: true }}
		transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
	/>
);

const SectionHeading = ({
	index,
	title,
	trigger,
}: {
	index: string;
	title: string;
	trigger: boolean;
}) => (
	<div className="mb-2">
		<div className="flex items-end gap-4 pl-6 pr-6 pb-2">
			<span className="font-inter text-sm text-neutral-500 pb-1">{index}</span>
			<h2 className="text-4xl md:text-6xl font-medium">
				<RevealText text={title} trigger={trigger} />
			</h2>
		</div>
		<AnimatedBorder trigger={trigger} />
	</div>
);

const ExternalLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="inline-flex items-center gap-1.5 text-neutral-200 underline decoration-neutral-600 underline-offset-4 hover:decoration-neutral-200 transition-colors w-fit"
	>
		{children}
		<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5" />
	</a>
);

const earlyWorkLinks = {
	tubeMusic: [
		{ label: "GitHub", href: "https://github.com/clover0916/11Tube-Music" },
		{
			label: "Download",
			href: "https://github.com/clover0916/11Tube-Music/releases",
		},
	],
	bot: [
		{
			label: "Invite",
			href: "https://discord.com/api/oauth2/authorize?client_id=726804663059480653&permissions=1644971949559&scope=bot%20applications.commands",
		},
	],
};

const _AnimatedIcon = animated(Icon);
const _AnimatedH1 = animated.h1 as any;
const _AnimatedP = animated.p as any;
const _AnimatedSpan = animated.span as any;

interface HomeContentProps {
	images: {
		clover: GetImageResult;
		bot: GetImageResult;
		tubeMusic: GetImageResult;
	};
}

export default function HomeContent({ images }: HomeContentProps) {
	const [isCopied, setIsCopied] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const isLoading = useStore(isLoadingStore);

	const copyToClipboard = (name: string) => () => {
		navigator.clipboard.writeText(name);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};

	const playAudio = () => {
		const audio = document.getElementById("name-audio") as HTMLAudioElement;
		if (audio) {
			audio.currentTime = 0;
			audio.play();
			setIsPlaying(true);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between w-full">
			<div
				className="flex h-svh justify-evenly w-full flex-col-reverse md:flex-row px-4 relative"
				id="about"
			>
				<div className="absolute bottom-0 left-0 w-full">
					<AnimatedBorder trigger={!isLoading} />
					<div className="flex flex-col gap-2 pl-6">
						<div className="flex flex-row items-center gap-2">
							<div className=" text-neutral-200 text-3xl font-light">
								<RevealText
									text="クローバーみどり"
									delay={0.5}
									trigger={!isLoading}
								/>
							</div>
							<div className="text-xl text-neutral-200 font-light italic font-inter">
								<RevealText
									text="[kɯɾoːbaː midoɾi]"
									delay={0.7}
									trigger={!isLoading}
								/>
							</div>
							<motion.button
								type="button"
								onClick={playAudio}
								className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer relative w-6 h-6 flex items-center justify-center"
								aria-label="Play pronunciation"
								initial={{ scale: 0, opacity: 0 }}
								whileInView={!isLoading ? { scale: 1, opacity: 1 } : undefined}
								viewport={{ once: true }}
								transition={{
									delay: 0.9,
									type: "spring",
									stiffness: 260,
									damping: 20,
								}}
							>
								<AnimatePresence mode="wait" initial={false}>
									{isPlaying ? (
										<motion.div
											key="wave"
											className="flex items-center gap-1 h-full"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.8 }}
											transition={{ duration: 0.15 }}
										>
											{[...Array(4)].map((_, i) => (
												<motion.div
													// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													key={i}
													className="w-0.5 bg-current rounded-full"
													initial={{ height: 4 }}
													animate={{ height: [6, 16, 6] }}
													transition={{
														duration: 0.5,
														repeat: Number.POSITIVE_INFINITY,
														delay: i * 0.1,
														ease: "easeInOut",
													}}
												/>
											))}
										</motion.div>
									) : (
										<motion.div
											key="speaker"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.8 }}
											transition={{ duration: 0.15 }}
										>
											<SpeakerHighIcon size={24} />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.button>
							<audio
								id="name-audio"
								preload="none"
								onEnded={() => setIsPlaying(false)}
								onPause={() => setIsPlaying(false)}
							>
								<source
									src="/assets/audio/speech.opus"
									type="audio/ogg; codecs=opus"
								/>
								<source src="/assets/audio/speech.mp3" type="audio/mpeg" />
								<source src="/assets/audio/speech.wav" type="audio/wav" />
								<track
									kind="captions"
									src="/assets/audio/speech.vtt"
									srcLang="ja"
									label="Japanese"
									default
								/>
							</audio>
						</div>
					</div>
					<AnimatedBorder delay={0.1} trigger={!isLoading} />
					<div className="flex flex-row w-full h-full pl-6">
						<div className="text-9xl font-medium">
							<RevealText
								text="Clover_Midori"
								delay={0.9}
								trigger={!isLoading}
							/>
						</div>
						<div className="flex-1 bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,rgba(255,255,255,.1)_8px,rgba(255,255,255,.1)_9px)]"></div>
					</div>
					<AnimatedBorder delay={0.2} trigger={!isLoading} />
					<div className="flex flex-row items-center pl-6">
						<p className="text-neutral-300 max-w-3xl py-1">
							<RevealText
								text="Software Developer / Enginner / Designer / Tech Enthusiast"
								delay={1.1}
								trigger={!isLoading}
							/>
						</p>
					</div>
					<AnimatedBorder delay={0.3} trigger={!isLoading} />
					<div className="flex flex-col gap-2 pl-6">
						<p className="text-neutral-300 py-2 max-w-3xl ">
							<RevealText
								text="Hi! I'm Clover_Midori, a passionate software developer and tech enthusiast. I love creating innovative solutions and exploring new technologies. Welcome to my personal site where I share my projects and ideas."
								delay={1.3}
								trigger={!isLoading}
							/>
						</p>
					</div>
					<AnimatedBorder delay={0.4} trigger={!isLoading} />
				</div>
			</div>

			<section className="w-full pt-28 pb-12" id="projects">
				<SectionHeading
					index="01"
					title="Featured Works"
					trigger={!isLoading}
				/>
				<div className="flex flex-col">
					{featuredWorks.map((work, i) => (
						<motion.article
							key={work.id}
							className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6 py-10 px-6 border-b border-neutral-600/50"
							initial={{ opacity: 0, y: 40 }}
							whileInView={!isLoading ? { opacity: 1, y: 0 } : undefined}
							transition={{ ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<div className="flex flex-col gap-2">
								<span className="font-inter text-sm text-neutral-500">
									{String(i + 1).padStart(2, "0")} — {work.period}
								</span>
								<h3 className="text-5xl font-medium leading-none">
									{work.title}
								</h3>
								<span className="inline-flex w-fit items-center gap-2 border border-neutral-600/60 rounded-full px-3 py-0.5 text-xs text-neutral-300 mt-2">
									<span
										className={`h-1.5 w-1.5 rounded-full ${
											work.status === "Beta" ? "bg-amber-400" : "bg-emerald-400"
										}`}
									/>
									{work.status}
								</span>
							</div>
							<div className="flex flex-col gap-4 max-w-3xl">
								<p className="text-neutral-200 text-lg">{work.subtitle}</p>
								<p className="text-sm text-neutral-400">{work.role}</p>
								<p className="text-neutral-300 leading-relaxed">
									{work.description}
								</p>
								<ul className="flex flex-col gap-1 text-neutral-300">
									{work.highlights.map((h) => (
										<li key={h} className="flex gap-2">
											<span className="text-neutral-500">—</span>
											{h}
										</li>
									))}
								</ul>
								<div className="flex flex-wrap gap-2">
									{work.stack.map((t) => (
										<span
											key={t}
											className="text-xs font-inter text-neutral-400 bg-neutral-800/60 rounded px-2 py-1"
										>
											{t}
										</span>
									))}
								</div>
								<div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
									{work.links.map((l) => (
										<ExternalLink key={l.href} href={l.href}>
											{l.label}
										</ExternalLink>
									))}
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</section>

			<section className="w-full py-12" id="history">
				<SectionHeading
					index="02"
					title="Awards & History"
					trigger={!isLoading}
				/>
				<ol className="flex flex-col">
					{history.map((item) => (
						<motion.li
							key={`${item.date}-${item.title}`}
							className="grid grid-cols-[5.5rem_1fr] md:grid-cols-[8rem_1fr] gap-4 py-4 px-6 border-b border-neutral-600/50"
							initial={{ opacity: 0 }}
							whileInView={!isLoading ? { opacity: 1 } : undefined}
							viewport={{ once: true, margin: "-50px" }}
						>
							<span className="font-inter text-neutral-500">{item.date}</span>
							<div className="flex flex-col">
								{item.href ? (
									<ExternalLink href={item.href}>{item.title}</ExternalLink>
								) : (
									<span className="text-neutral-200">{item.title}</span>
								)}
								{item.detail && (
									<span className="text-sm text-neutral-400">
										{item.detail}
									</span>
								)}
							</div>
						</motion.li>
					))}
				</ol>
			</section>

			<section className="w-full py-12" id="early-works">
				<SectionHeading index="03" title="Early Works" trigger={!isLoading} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 px-6">
					{[
						{
							title: "11Tube Music",
							subtitle: "YouTube Music client for Windows 11 — C# / MSIX",
							image: images.tubeMusic,
							imageClass: "bg-[#692f2f] p-3",
							imgClass: "max-h-full max-w-full object-contain",
							links: earlyWorkLinks.tubeMusic,
						},
						{
							title: "Clover_Bot",
							subtitle: "Discord Bot",
							image: images.bot,
							imageClass: "bg-neutral-900",
							imgClass: "h-full w-full object-cover",
							links: earlyWorkLinks.bot,
						},
					].map((w) => (
						<motion.div
							key={w.title}
							className="flex gap-4 items-center border border-neutral-600/50 rounded-lg p-3"
							initial={{ opacity: 0, y: 30 }}
							whileInView={!isLoading ? { opacity: 1, y: 0 } : undefined}
							transition={{ ease: "easeOut" }}
							viewport={{ once: true, margin: "-50px" }}
						>
							<div
								className={`h-20 w-20 shrink-0 rounded-md overflow-hidden flex items-center justify-center ${w.imageClass}`}
							>
								<img
									src={w.image.src}
									{...w.image.attributes}
									alt={w.title}
									className={w.imgClass}
								/>
							</div>
							<div className="flex flex-col gap-1 min-w-0">
								<p className="text-xl">{w.title}</p>
								<p className="text-sm text-neutral-400">{w.subtitle}</p>
								<div className="flex gap-4 pt-1">
									{w.links.map((l) => (
										<ExternalLink key={l.href} href={l.href}>
											{l.label}
										</ExternalLink>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			<section className="w-full py-12" id="skills">
				<SectionHeading index="04" title="Skills" trigger={!isLoading} />
				<dl className="flex flex-col">
					{skills.map((s) => (
						<div
							key={s.area}
							className="grid grid-cols-1 md:grid-cols-[14rem_1fr] gap-2 md:gap-4 py-4 px-6 border-b border-neutral-600/50"
						>
							<dt className="text-neutral-400">{s.area}</dt>
							<dd className="flex flex-wrap gap-x-4 gap-y-1 text-neutral-200">
								{s.items.map((it) => (
									<span key={it}>{it}</span>
								))}
							</dd>
						</div>
					))}
				</dl>
			</section>

			<div
				className="flex flex-col items-center justify-center h-80 my-8 w-full px-4"
				id="contact"
			>
				<h2 className="text-3xl font-bold pb-8">Contact</h2>
				<div className="w-full flex flex-col md:flex-row gap-8 md:gap-32 items-center justify-center">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faDiscord} className="h-8 pr-4" />
						<span className="text-xl">clover_0916</span>
						{isCopied ? (
							<div className="relative flex items-center">
								<FontAwesomeIcon icon={faCheck} className="h-4 pl-2" />
								<span className="absolute text-sm flex justify-center ml-6">
									Copied!
								</span>
							</div>
						) : (
							<FontAwesomeIcon
								icon={faCopy}
								className="h-3 pl-2 cursor-pointer"
								onClick={copyToClipboard("clover_0916")}
							/>
						)}
					</div>
					<a
						className="flex items-center cursor-pointer"
						href="https://github.com/clover0916"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faGithub} className="h-8 pr-4" />
						<span className="text-xl">clover0916</span>
						<FontAwesomeIcon
							icon={faArrowUpRightFromSquare}
							className="h-3 pl-2"
						/>
					</a>
					<a
						className="flex items-center cursor-pointer"
						href="https://x.com/Clover_0916"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faXTwitter} className="h-8 pr-4" />
						<div className="text-xl">@Clover_0916</div>
						<FontAwesomeIcon
							icon={faArrowUpRightFromSquare}
							className="h-3 pl-2"
						/>
					</a>
				</div>
			</div>
		</main>
	);
}
