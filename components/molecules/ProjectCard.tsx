import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Markdown } from "@/components/atoms/Markdown";
import { Tag } from "@/components/atoms/Tag";

type ProjectCardProps = {
	title: string;
	/** Markdown body — the project description. */
	description: string;
	role: string;
	stack: string[];
	/** Optional — the "Live" link is hidden when this is empty. */
	link?: string;
	/** Optional — the "GitHub" link is hidden when this is empty. */
	repo?: string;
};

const dotPalette = ["#2b50d6", "#ea5c4d", "#f5c518", "#f6a623"];

export function ProjectCard({
	title,
	description,
	role,
	stack,
	link,
	repo,
}: ProjectCardProps) {
	return (
		<article className="rounded-3xl border border-line bg-white p-7 shadow-[0_16px_40px_-28px_rgba(26,26,26,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(26,26,26,0.4)]">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
				<div className="min-w-0">
					<h3 className="font-display text-xl font-extrabold tracking-tight text-ink">
						{title}
					</h3>
					<span className="max-w-full self-start shrink-0 rounded-full border border-line px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.15em] text-ink-faint">
						{role}
					</span>
					<Markdown className="mt-3 text-sm leading-7 text-ink-soft">
						{description}
					</Markdown>
				</div>
			</div>
			<div className="mt-5 flex flex-wrap gap-2">
				{stack.map((item, i) => (
					<Tag key={item} dotColor={dotPalette[i % dotPalette.length]}>
						{item}
					</Tag>
				))}
			</div>
			{(link || repo) && (
				<div className="mt-6 flex flex-wrap items-center gap-5">
					{link && (
						<a
							href={link}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 font-display text-sm font-bold text-ink transition hover:text-brand"
						>
							Live
							<FontAwesomeIcon
								icon={faArrowUpRightFromSquare}
								className="h-3 w-3"
							/>
						</a>
					)}
					{repo && (
						<a
							href={repo}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 font-display text-sm font-bold text-ink transition hover:text-brand"
						>
							GitHub
							<FontAwesomeIcon
								icon={faArrowUpRightFromSquare}
								className="h-3 w-3"
							/>
						</a>
					)}
				</div>
			)}
		</article>
	);
}
