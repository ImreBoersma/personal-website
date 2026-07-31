import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
	/** Raw markdown string (typically a content file's body). */
	children: string;
	/** Extra classes for the wrapper — spacing/color is inherited from the parent. */
	className?: string;
};

/**
 * Renders a markdown string as styled prose. Paragraph spacing comes from the
 * wrapper's `space-y-*`; text color and size are inherited from the parent so
 * this drops into any card without extra theming.
 */
export function Markdown({ children, className }: MarkdownProps) {
	return (
		<div className={className}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					a: ({ node, ...props }) => (
						<a
							{...props}
							target="_blank"
							rel="noreferrer"
							className="font-medium text-sky-700 underline underline-offset-2 transition hover:text-sky-900"
						/>
					),
					strong: ({ node, ...props }) => (
						<strong {...props} className="font-semibold text-zinc-950" />
					),
					ul: ({ node, ...props }) => (
						<ul {...props} className="list-disc space-y-1 pl-5" />
					),
				}}
			>
				{children}
			</ReactMarkdown>
		</div>
	);
}
