import Image from "next/image";
import type { Landing } from "@/lib/content";

const archivo = "var(--font-archivo), 'Archivo', sans-serif";
const lato = "var(--font-lato), 'Lato', system-ui, sans-serif";

const navLinks = [
	{ href: "#about", label: "Over mij" },
	{ href: "#projects", label: "Werk" },
	{ href: "#experience", label: "Ervaring" },
	{ href: "#skills", label: "Vaardigheden" },
	{ href: "#contact", label: "Contact" },
];

type Dot = {
	left: string;
	top: string;
	size: string;
	color: string;
	anim: string;
};

// Deterministic pseudo-random so server and client render identical confetti.
function rnd(seed: number) {
	const x = Math.sin(seed * 127.1) * 43758.5453;
	return x - Math.floor(x);
}

function buildDots(): Dot[] {
	const colors = ["#EA5C4D", "#2B50D6", "#F5C518", "#F6A623"];
	const dots: Dot[] = [];
	const bands = [
		{ y0: 1, y1: 20 },
		{ y0: 82, y1: 99 },
	];
	// Kept intentionally low: each dot is an absolutely-positioned animated node,
	// and a large count dominates Style & Layout, delaying the largest paint (LCP).
	const rows = 2;
	const cols = 16;
	const step = 100 / cols;
	let i = 0;
	for (const b of bands) {
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				i++;
				const left = col * step + rnd(i) * step * 0.7;
				if (left > 99) continue;
				const top = b.y0 + row * ((b.y1 - b.y0) / rows) + rnd(i * 3) * 0.8;
				const colored = rnd(i * 7) < 0.13;
				const dur = (3 + rnd(i * 5) * 2.5).toFixed(2);
				const delay = (rnd(i * 13) * 4).toFixed(2);
				dots.push({
					left: `${left.toFixed(2)}%`,
					top: `${top.toFixed(2)}%`,
					size: `${colored ? 4.5 : 3}px`,
					color: colored ? colors[Math.floor(rnd(i * 11) * 4)] : "#d5d9e0",
					anim: `tw ${dur}s ease-in-out ${delay}s infinite`,
				});
			}
		}
	}
	return dots;
}

type LandingHeroProps = {
	name: string;
	landing: Landing;
	resume: { label: string; href: string };
};

export function LandingHero({ name, landing, resume }: LandingHeroProps) {
	const dots = buildDots();

	const initials = name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div
			id="top"
			data-landing
			style={{
				position: "relative",
				minHeight: "100vh",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				background: "#ffffff",
				color: "#1a1a1a",
				fontFamily: lato,
			}}
		>
			{/* confetti dot field */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					zIndex: 0,
				}}
			>
				{dots.map((d, idx) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: dots are a static generated list
						key={idx}
						style={{
							position: "absolute",
							left: d.left,
							top: d.top,
							width: d.size,
							height: d.size,
							background: d.color,
							borderRadius: "50%",
							animation: d.anim,
						}}
					/>
				))}
			</div>

			{/* corner blobs */}
			<div
				style={{
					position: "absolute",
					top: -60,
					left: -70,
					width: 230,
					height: 230,
					background: "#EA5C4D",
					borderRadius: "0 0 100% 0",
					transformOrigin: "top left",
					animation: "floatA 11s ease-in-out infinite",
					zIndex: 0,
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: -120,
					right: -90,
					width: 300,
					height: 300,
					background: "#F6A623",
					borderRadius: "0 0 0 100%",
					animation: "floatC 13s ease-in-out infinite",
					zIndex: 0,
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 34,
					right: 150,
					width: 64,
					height: 64,
					background: "#F5C518",
					borderRadius: "50%",
					animation: "floatA 11s ease-in-out infinite",
					zIndex: 0,
					pointerEvents: "none",
				}}
			/>

			{/* top bar */}
			<header
				style={{
					position: "relative",
					zIndex: 3,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 20,
					padding: "26px clamp(20px,5vw,64px)",
				}}
			>
				<a
					href="#top"
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						color: "#1a1a1a",
					}}
				>
					<Image
						src="/favicon/favicon.svg"
						alt="Imre Boersma logo"
						width={40}
						height={40}
						unoptimized
						style={{ display: "block" }}
					/>
					<span
						style={{
							fontFamily: archivo,
							fontWeight: 700,
							fontSize: 15,
							letterSpacing: 0.2,
						}}
					>
						imreboersma.nl
					</span>
				</a>

				<nav
					className="lnd-nav"
					style={{
						display: "none",
						alignItems: "center",
						gap: 26,
						fontFamily: archivo,
						fontWeight: 700,
						fontSize: 14,
					}}
				>
					{navLinks.map((link) => (
						<a key={link.href} href={link.href}>
							{link.label}
						</a>
					))}
				</nav>
			</header>

			{/* hero */}
			<main
				style={{
					position: "relative",
					zIndex: 2,
					flex: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "20px clamp(20px,5vw,64px) 60px",
				}}
			>
				<div
					className="lnd-grid"
					style={{
						width: "100%",
						maxWidth: 1060,
						display: "grid",
						gridTemplateColumns: "1.15fr .85fr",
						gap: "clamp(32px,6vw,80px)",
						alignItems: "center",
					}}
				>
					<div style={{ animation: "rise .7s ease both" }}>
						<div
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: 9,
								padding: "7px 14px",
								borderRadius: 999,
								background: "#f2f4f9",
								fontSize: 13,
								fontWeight: 700,
								color: "#2B50D6",
								marginBottom: 22,
							}}
						>
							<span
								style={{
									width: 9,
									height: 9,
									borderRadius: "50%",
									background: "#2fb862",
									boxShadow: "0 0 0 4px rgba(47,184,98,.18)",
								}}
							/>
							{landing.landingCopy.avail}
						</div>
						<div
							style={{
								fontFamily: archivo,
								fontWeight: 600,
								fontSize: "clamp(18px,2.2vw,22px)",
								color: "#5b6472",
								marginBottom: 2,
							}}
						>
							{landing.landingCopy.greet}
						</div>
						<h1
							style={{
								fontFamily: archivo,
								fontWeight: 900,
								fontSize: "clamp(46px,7vw,86px)",
								lineHeight: 0.98,
								letterSpacing: -1.5,
								margin: "0 0 14px",
							}}
						>
							{name}
						</h1>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								marginBottom: 18,
							}}
						>
							<span
								style={{
									fontFamily: archivo,
									fontWeight: 700,
									fontSize: "clamp(18px,2.4vw,26px)",
									color: "#1a1a1a",
								}}
							>
								{landing.landingCopy.role}
							</span>
							<span
								style={{
									width: 6,
									height: 6,
									borderRadius: "50%",
									background: "#EA5C4D",
								}}
							/>
							<span
								style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "#6b7280" }}
							>
								{landing.location}
							</span>
						</div>
						<p
							style={{
								fontSize: "clamp(16px,1.9vw,19px)",
								lineHeight: 1.6,
								color: "#4b5563",
								maxWidth: "30em",
								margin: "0 0 30px",
							}}
						>
							{landing.landingCopy.sub}
						</p>

						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 14,
								alignItems: "center",
							}}
						>
							<a
								href={landing.cta.href}
								className="lnd-cta"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: 10,
									background: "#1a1a1a",
									color: "#fff",
									fontFamily: archivo,
									fontWeight: 700,
									fontSize: 16,
									padding: "15px 26px",
									borderRadius: 999,
								}}
							>
								{landing.cta.label}
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.4"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M12 5v14M6 13l6 6 6-6" />
								</svg>
							</a>
							<a
								href={resume.href}
								download
								className="lnd-ghost"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: 9,
									color: "#1a1a1a",
									fontFamily: archivo,
									fontWeight: 700,
									fontSize: 16,
									padding: "15px 22px",
									borderRadius: 999,
									border: "2px solid #e6e6e6",
								}}
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M12 3v11M8 10l4 4 4-4M5 20h14" />
								</svg>
								{resume.label}
							</a>
							<a
								href={landing.github}
								target="_blank"
								rel="noopener"
								className="lnd-ghost"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: 9,
									color: "#1a1a1a",
									fontFamily: archivo,
									fontWeight: 700,
									fontSize: 16,
									padding: "15px 22px",
									borderRadius: 999,
									border: "2px solid #e6e6e6",
								}}
							>
								<svg
									width="19"
									height="19"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.89.12 3.19.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22 0 1.61-.02 2.9-.02 3.29 0 .32.22.7.83.58C20.56 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5Z" />
								</svg>
								GitHub
							</a>
							<a
								href={landing.linkedin}
								target="_blank"
								rel="noopener"
								className="lnd-ghost"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: 9,
									color: "#1a1a1a",
									fontFamily: archivo,
									fontWeight: 700,
									fontSize: 16,
									padding: "15px 22px",
									borderRadius: 999,
									border: "2px solid #e6e6e6",
								}}
							>
								<svg
									width="19"
									height="19"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.79 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
								</svg>
								LinkedIn
							</a>
						</div>
					</div>

					{/* headshot with blue blob */}
					<div
						style={{
							justifySelf: "center",
							position: "relative",
							animation: "rise .7s .12s ease both",
						}}
					>
						<div
							style={{
								position: "absolute",
								left: "-16%",
								top: "-22%",
								width: "132%",
								height: "132%",
								background: "#2B50D6",
								borderRadius: "48% 52% 55% 45%/50% 45% 55% 50%",
								animation: "floatB 9s ease-in-out infinite",
								zIndex: 0,
							}}
						/>
						<div
							style={{
								position: "absolute",
								inset: -14,
								border: "2.5px dashed #cfd4de",
								borderRadius: "50%",
								animation: "ringspin 40s linear infinite",
								zIndex: 1,
							}}
						/>
						<div
							style={{
								position: "relative",
								zIndex: 2,
								width: "clamp(230px,26vw,300px)",
								height: "clamp(230px,26vw,300px)",
								borderRadius: "50%",
								overflow: "hidden",
								boxShadow: "0 20px 50px rgba(0,0,0,.16)",
								background: "#eef0f4",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{/* Placeholder shown until a headshot file exists at landing.headshot. */}
							<span
								style={{
									position: "absolute",
									fontFamily: archivo,
									fontWeight: 900,
									fontSize: 72,
									color: "#c3c9d4",
									userSelect: "none",
								}}
							>
								{initials}
							</span>
							<Image
								priority
								fetchPriority="high"
								src={landing.headshot}
								alt={`Portretfoto van ${name}`}
								fill
								sizes="(max-width: 860px) 230px, 300px"
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
