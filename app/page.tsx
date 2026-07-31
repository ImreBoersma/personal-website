import { Markdown } from "@/components/atoms/Markdown";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { AboutCard } from "@/components/molecules/AboutCard";
import { ContactCard } from "@/components/molecules/ContactCard";
import { PortfolioSection } from "@/components/molecules/PortfolioSection";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { SkillGroup } from "@/components/molecules/SkillGroup";
import { LandingHero } from "@/components/organisms/LandingHero";
import {
	getEducation,
	getExperience,
	getProfile,
	getProjects,
	getSkills,
	getVolunteerWork,
} from "@/lib/content";

export default async function Home() {
	const [profile, projects, skills, experience, education, volunteerWork] =
		await Promise.all([
			getProfile(),
			getProjects(),
			getSkills(),
			getExperience(),
			getEducation(),
			getVolunteerWork(),
		]);

	return (
		<>
			<LandingHero
				name={profile.name}
				landing={profile.landing}
				resume={profile.resume}
			/>

			<div className="bg-[radial-gradient(circle_at_50%_-10%,_rgba(43,80,214,0.06),_transparent_45%)] bg-white text-ink">
				<main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-20 sm:px-8 lg:px-10">
					<section id="about" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
						<SectionHeading
							eyebrow={profile.about.eyebrow}
							title={profile.about.heading}
							accent="coral"
						/>
						<AboutCard
							title={profile.about.cardTitle}
							body={profile.about.body}
						/>
					</section>

					<section id="projects">
						<PortfolioSection
							eyebrow={profile.sections.projects.eyebrow}
							title={profile.sections.projects.title}
							description={profile.sections.projects.description}
							accent="brand"
						>
							<div className="mt-8 grid gap-6 md:grid-cols-2">
								{projects.map((project) => (
									<ProjectCard
										key={project.title}
										title={project.title}
										description={project.description}
										role={project.role}
										stack={project.stack}
										link={project.link}
										repo={project.repo}
									/>
								))}
							</div>
						</PortfolioSection>
					</section>

					<section
						id="experience"
						className="rounded-[2rem] border border-line bg-white p-8 shadow-[0_16px_40px_-28px_rgba(26,26,26,0.3)] sm:p-10"
					>
						<SectionHeading
							eyebrow={profile.sections.experience.eyebrow}
							title={profile.sections.experience.title}
							accent="amber"
						/>
						<div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
							<div className="space-y-4">
								<div className="flex items-center gap-2">
									<span className="h-2 w-2 rounded-full bg-brand" />
									<h3 className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink-faint">
										Werkervaring
									</h3>
								</div>
								{experience.map((item) => (
									<article
										key={`${item.company}-${item.period}`}
										className="rounded-2xl border border-line bg-mist p-5"
									>
										<div className="flex flex-wrap items-center justify-between gap-2">
											<h4 className="font-display text-base font-extrabold text-ink">
												{item.role} · {item.company}
											</h4>
											<span className="rounded-full border border-line bg-white px-2.5 py-0.5 font-display text-xs font-bold text-ink-faint">
												{item.period}
											</span>
										</div>
										<p className="mt-1.5 text-sm text-ink-faint">
											{item.location}
										</p>
										<Markdown className="mt-3 text-sm leading-7 text-ink-soft">
											{item.summary}
										</Markdown>
									</article>
								))}
							</div>
							<div className="space-y-6">
								<div className="space-y-4">
									<div className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-coral" />
										<h3 className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink-faint">
											Opleiding
										</h3>
									</div>
									{education.map((item) => (
										<article
											key={item.title}
											className="rounded-2xl border border-line bg-mist p-5"
										>
											<h4 className="font-display text-base font-extrabold text-ink">
												{item.title}
											</h4>
											<p className="mt-1 text-sm text-ink-faint">
												{item.institution}
											</p>
											<p className="mt-0.5 text-sm text-ink-faint">
												{item.period}
											</p>
											<p className="mt-3 text-sm leading-7 text-ink-soft">
												{item.details}
											</p>
										</article>
									))}
								</div>
								<div className="space-y-3">
									<div className="flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-sun" />
										<h3 className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink-faint">
											Vrijwilligerswerk
										</h3>
									</div>
									<ul className="space-y-2.5 rounded-2xl border border-line bg-mist p-5 text-sm leading-7 text-ink-soft">
										{volunteerWork.map((item) => (
											<li key={item} className="flex gap-2.5">
												<span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</section>

					<section
						id="skills"
						className="rounded-[2rem] border border-line bg-white p-8 shadow-[0_16px_40px_-28px_rgba(26,26,26,0.3)] sm:p-10"
					>
						<SectionHeading
							eyebrow={profile.sections.skills.eyebrow}
							title={profile.sections.skills.title}
							accent="sun"
						/>
						<div className="mt-8 grid gap-6 md:grid-cols-3">
							{skills.map((skillGroup) => (
								<SkillGroup key={skillGroup.title} {...skillGroup} />
							))}
						</div>
					</section>

					<ContactCard
						title={profile.sections.contact.title}
						description={profile.sections.contact.description}
						github={profile.landing.github}
						linkedin={profile.landing.linkedin}
					/>
				</main>
			</div>
		</>
	);
}
