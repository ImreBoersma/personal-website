export type Accent = "brand" | "coral" | "sun" | "amber";

const accentHex: Record<Accent, string> = {
	brand: "#2b50d6",
	coral: "#ea5c4d",
	sun: "#f5c518",
	amber: "#f6a623",
};

type SectionHeadingProps = {
	eyebrow: string;
	title: string;
	description?: string;
	align?: "left" | "center";
	accent?: Accent;
};

export function SectionHeading({
	eyebrow,
	title,
	description,
	align = "left",
	accent = "brand",
}: SectionHeadingProps) {
	return (
		<div className={align === "center" ? "text-center" : "text-left"}>
			<span
				className={`inline-flex items-center gap-2 rounded-full bg-cloud px-3.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink-soft ${
					align === "center" ? "mx-auto" : ""
				}`}
			>
				<span
					className="h-2 w-2 rounded-full"
					style={{ background: accentHex[accent] }}
				/>
				{eyebrow}
			</span>
			<h2 className="mt-4 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
				{title}
			</h2>
			{description ? (
				<p className="mt-3 max-w-2xl text-base leading-8 text-ink-soft">
					{description}
				</p>
			) : null}
		</div>
	);
}
