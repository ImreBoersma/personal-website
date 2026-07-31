import { Tag } from "@/components/atoms/Tag";

type SkillGroupProps = {
	title: string;
	items: string[];
};

const dotPalette = ["#2b50d6", "#ea5c4d", "#f5c518", "#f6a623"];

export function SkillGroup({ title, items }: SkillGroupProps) {
	return (
		<div className="rounded-3xl border border-line bg-white p-6 shadow-[0_16px_40px_-28px_rgba(26,26,26,0.35)]">
			<h3 className="font-display text-lg font-extrabold tracking-tight text-ink">
				{title}
			</h3>
			<div className="mt-4 flex flex-wrap gap-2">
				{items.map((item, i) => (
					<Tag key={item} dotColor={dotPalette[i % dotPalette.length]}>
						{item}
					</Tag>
				))}
			</div>
		</div>
	);
}
