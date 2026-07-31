import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
	faEnvelope,
	type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ContactLink = {
	href: string;
	label: string;
	icon: IconDefinition;
};

type ContactLinksProps = {
	github: string;
	linkedin: string;
};

export function ContactLinks({ github, linkedin }: ContactLinksProps) {
	const links: ContactLink[] = [
		{
			href: "mailto:imre.boersma@gmail.com",
			label: "imre.boersma@gmail.com",
			icon: faEnvelope,
		},
		{
			href: linkedin,
			label: "LinkedIn",
			icon: faLinkedin,
		},
		{
			href: github,
			label: "GitHub",
			icon: faGithub,
		},
	];
	return (
		<div className="space-y-2.5 font-display text-sm font-semibold text-zinc-300">
			{links.map((link) => (
				<a
					key={link.label}
					href={link.href}
					target={link.href.startsWith("http") ? "_blank" : undefined}
					rel={link.href.startsWith("http") ? "noreferrer" : undefined}
					className="group flex items-center gap-3 transition hover:text-white"
				>
					<span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-brand">
						<FontAwesomeIcon
							icon={link.icon}
							className="h-4 w-4 text-zinc-100"
						/>
					</span>
					<span>{link.label}</span>
				</a>
			))}
		</div>
	);
}
