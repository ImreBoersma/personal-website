type ActionButtonProps = {
	href: string;
	children: React.ReactNode;
	variant?: "primary" | "secondary";
	download?: boolean;
};

export function ActionButton({
	href,
	children,
	variant = "primary",
	download = false,
}: ActionButtonProps) {
	const baseClasses = "rounded-full px-5 py-3 text-sm font-semibold transition";
	const variantClasses =
		variant === "primary"
			? "bg-zinc-950 text-white hover:bg-zinc-800"
			: "border border-zinc-300 text-zinc-700 hover:border-zinc-950 hover:text-zinc-950";

	return (
		<a
			href={href}
			download={download}
			className={`${baseClasses} ${variantClasses}`}
		>
			{children}
		</a>
	);
}
