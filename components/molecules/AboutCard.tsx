import { Markdown } from "@/components/atoms/Markdown";

type AboutCardProps = {
	title: string;
	/** Markdown body (one or more paragraphs). */
	body: string;
};

export function AboutCard({ title, body }: AboutCardProps) {
	return (
		<div className="rounded-3xl border border-line bg-white p-7 shadow-[0_16px_40px_-28px_rgba(26,26,26,0.35)] sm:p-9">
			<h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
				{title}
			</h2>
			<Markdown className="mt-4 space-y-4 text-base leading-8 text-ink-soft">
				{body}
			</Markdown>
		</div>
	);
}
