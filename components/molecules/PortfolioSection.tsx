import type { Accent } from "@/components/atoms/SectionHeading";
import { SectionHeading } from "@/components/atoms/SectionHeading";

type PortfolioSectionProps = {
	eyebrow: string;
	title: string;
	description?: string;
	accent?: Accent;
	children: React.ReactNode;
};

export function PortfolioSection({
	eyebrow,
	title,
	description,
	accent,
	children,
}: PortfolioSectionProps) {
	return (
		<section className="space-y-8">
			<SectionHeading
				eyebrow={eyebrow}
				title={title}
				description={description}
				accent={accent}
			/>
			{children}
		</section>
	);
}
