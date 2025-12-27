export default function Footer() {
	return (
		<nav className="p-8 flex justify-between flex-col-reverse md:flex-row">
			<div>
				<span>Clover_Midori 2023 All Rights Reserved.</span>
			</div>
			<div className="flex gap-8 pb-4 md:pb-0">
				<a href="https://blog.clover-midori.net">ブログ</a>
				<a href="/tos">利用規約</a>
				<a href="/privacy">プライバシーポリシー</a>
			</div>
		</nav>
	);
}
