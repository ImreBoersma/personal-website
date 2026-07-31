import { ContactLinks } from "@/components/molecules/ContactLinks";

type ContactCardProps = {
	title: string;
	description: string;
	github: string;
	linkedin: string;
};

export function ContactCard({
	title,
	description,
	github,
	linkedin,
}: ContactCardProps) {
	return (
		<section
			id="contact"
			className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-zinc-100 shadow-[0_28px_70px_-34px_rgba(26,26,26,0.7)] sm:p-10"
		>
			{/* playful corner blob, echoing the landing */}
			<div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand/25 blur-2xl" />
			<div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-zinc-200">
						<span className="h-2 w-2 rounded-full bg-sun" />
						Contact
					</span>
					<h2 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
						{title}
					</h2>
					<p className="mt-4 max-w-xl text-base leading-8 text-zinc-300">
						{description}
					</p>
				</div>
				<ContactLinks github={github} linkedin={linkedin} />
			</div>
		</section>
	);
}
