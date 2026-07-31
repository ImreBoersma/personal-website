import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

type Link = { label: string; href: string };

/** Bilingual hero copy for the landing design. */
export type LandingCopy = {
	greet: string;
	role: string;
	sub: string;
	avail: string;
	badge: string;
};

export type Landing = {
	location: string;
	github: string;
	linkedin: string;
	/** Public path to the headshot image (shows a placeholder until the file exists). */
	headshot: string;
	cta: { label: string; href: string };
	landingCopy: LandingCopy;
};

export type Profile = {
	name: string;
	resume: Link;
	landing: Landing;
	about: {
		eyebrow: string;
		heading: string;
		cardTitle: string;
		/** Markdown body — the "about me" paragraphs. */
		body: string;
	};
	sections: {
		projects: { eyebrow: string; title: string; description: string };
		experience: { eyebrow: string; title: string };
		skills: { eyebrow: string; title: string };
		contact: { title: string; description: string };
	};
};

export type SkillGroup = { title: string; items: string[] };

export type ExperienceItem = {
	role: string;
	company: string;
	period: string;
	location: string;
	/** Markdown body — the role summary. */
	summary: string;
};

export type EducationItem = {
	title: string;
	institution: string;
	period: string;
	details: string;
};

export type Project = {
	title: string;
	role: string;
	stack: string[];
	/** Optional — omit from frontmatter to hide the "Live" link on the card. */
	link?: string;
	/** Optional — omit from frontmatter to hide the "GitHub" link on the card. */
	repo?: string;
	problem: string;
	/** Markdown body — the project description / summary. */
	description: string;
	// Featured-only fields.
	impact?: string;
	decisions?: string[];
	challenges?: string[];
};

/** Read one markdown file and split frontmatter (`data`) from the body (`content`). */
async function readEntry(...segments: string[]) {
	const raw = await readFile(path.join(contentDir, ...segments), "utf8");
	const { data, content } = matter(raw);
	return { data, body: content.trim() };
}

/** Read every markdown file in a subdirectory, sorted by filename (numeric prefixes = order). */
async function readCollection(dir: string) {
	const files = (await readdir(path.join(contentDir, dir)))
		.filter((f) => f.endsWith(".md"))
		.sort();
	return Promise.all(files.map((file) => readEntry(dir, file)));
}

export async function getProfile(): Promise<Profile> {
	const { data, body } = await readEntry("profile.md");
	return {
		...(data as Omit<Profile, "about">),
		about: { ...(data as Profile).about, body },
	};
}

export async function getSkills(): Promise<SkillGroup[]> {
	const { data } = await readEntry("skills.md");
	return (data.groups ?? []) as SkillGroup[];
}

export async function getEducation(): Promise<EducationItem[]> {
	const { data } = await readEntry("education.md");
	return (data.items ?? []) as EducationItem[];
}

export async function getVolunteerWork(): Promise<string[]> {
	const { data } = await readEntry("volunteer.md");
	return (data.items ?? []) as string[];
}

export async function getExperience(): Promise<ExperienceItem[]> {
	const entries = await readCollection("experience");
	return entries.map(({ data, body }) => ({
		...(data as Omit<ExperienceItem, "summary">),
		summary: body,
	}));
}

export async function getProjects(): Promise<Project[]> {
	const entries = await readCollection("projects");
	return entries.map(({ data, body }) => ({
		problem: "",
		...(data as Partial<Project>),
		title: data.title,
		role: data.role,
		stack: data.stack ?? [],
		description: body,
	})) as Project[];
}
