export type WorkLink = { label: string; href: string };

export type FeaturedWork = {
	id: string;
	title: string;
	subtitle: string;
	period: string;
	status: string;
	role: string;
	description: string;
	highlights: string[];
	stack: string[];
	links: WorkLink[];
};

export const featuredWorks: FeaturedWork[] = [
	{
		id: "eauploader",
		title: "EAUploader",
		subtitle: "Easy Avatar Uploader for VRChat",
		period: "2024 —",
		status: "Active",
		role: "Chief Developer / Project EAUploader",
		description:
			"Unity に慣れていない人でも VRChat にアバターをアップロード・調整・管理できるようにする Unity エディタ拡張。BOOTH・Vket Store・OpenUPM・VCC で無料配布し、継続的にメンテナンスしています。",
		highlights: [
			"U-22 プログラミング・コンテスト2024 SAJ賞（チームで受賞）",
			"v1.6 系で Studio UI と安全な Prefab 管理を導入",
		],
		stack: ["C#", "Unity 2022.3", "VRChat SDK3", "VCC / UPM"],
		links: [
			{ label: "Website", href: "https://eauploader.uslog.tech" },
			{
				label: "GitHub",
				href: "https://github.com/eauploader/EAUploader-for-VRChat",
			},
			{ label: "BOOTH", href: "https://uslog.booth.pm/items/5405372" },
			{
				label: "Interview",
				href: "https://vr-lifemagazine.com/eauploader-interview/",
			},
		],
	},
	{
		id: "world-sync",
		title: "World Sync",
		subtitle: "VRChat の空間をインスタンスを越えて同期・配信",
		period: "2026 —",
		status: "Beta",
		role: "Tech Lead / USLOG",
		description:
			"VRChat のインスタンス人数上限を越えてライブを届けるための、空間のリアルタイム同期・配信システム。エンコードした空間を後から再生でき、Unity のバージョン違いや Unity アプリとの同期にも対応します。2026年11月にベータ版を公開。",
		highlights: [
			"VRライフマガジンにベータ提供開始の記事を寄稿",
			"OSC Bridge による表情同期、ライセンス配布基盤を実装",
		],
		stack: ["Unity", "VRChat", "OSC", "UPM Registry"],
		links: [
			{ label: "Website", href: "https://world-sync.uslog.tech" },
			{
				label: "Article",
				href: "https://vr-lifemagazine.com/world-sync_uslog/",
			},
		],
	},
];

export type HistoryItem = {
	date: string;
	title: string;
	detail?: string;
	href?: string;
};

export const history: HistoryItem[] = [
	{
		date: "2026.11",
		title: "World Sync ベータ版を公開",
		detail: "VRライフマガジンに寄稿",
		href: "https://vr-lifemagazine.com/world-sync_uslog/",
	},
	{
		date: "2026.11",
		title: "EAUploader v1.6.0 – v1.6.2 をリリース",
		href: "https://github.com/eauploader/EAUploader-for-VRChat/releases",
	},
	{
		date: "2025.07",
		title: "Vket 2025 Summer 出展",
		detail: "USLOG ブースの実装",
	},
	{
		date: "2024.11",
		title: "U-22 プログラミング・コンテスト2024 SAJ賞",
		detail:
			"Easy Avatar Uploader for VRChat（Project EAUploader としてチームで受賞）",
	},
	{
		date: "2024",
		title: "EAUploader の開発・無料配布を開始",
	},
	{
		date: "2023",
		title: "11Tube Music / Clover_Bot を公開",
	},
];

export const skills: { area: string; items: string[] }[] = [
	{
		area: "Unity / VRChat",
		items: ["C#", "Editor Extensions", "VRChat SDK3", "OSC", "VCC / UPM"],
	},
	{
		area: "Web",
		items: ["TypeScript", "Astro", "React", "Tailwind CSS", "three.js / R3F"],
	},
	{
		area: "Desktop / Systems",
		items: ["Rust", "C# / Windows (MSIX)"],
	},
	{
		area: "Infra / Ops",
		items: [
			"Cloudflare Workers",
			"Vercel",
			"GitHub Actions",
			"Release Management",
		],
	},
	{
		area: "Creative",
		items: ["Video Editing", "Music Production", "Design"],
	},
];
