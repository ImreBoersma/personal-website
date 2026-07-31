type TagProps = {
	children: React.ReactNode;
	/** Optional accent dot color (e.g. "#2b50d6"). */
	dotColor?: string;
};

export function Tag({ children, dotColor }: TagProps) {
	return (
		<span className="inline-flex items-center gap-2 rounded-full bg-mist px-3.5 py-1.5 font-display text-sm font-bold text-ink">
			{dotColor ? (
				<span
					className="h-2 w-2 rounded-full"
					style={{ background: dotColor }}
				/>
			) : null}
			{children}
		</span>
	);
}
