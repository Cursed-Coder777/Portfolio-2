import { Link } from "react-router";
import { projectsData, projectCategories } from "../data/projectsData";
import "./Projects.scss";

const categoryAccents = {
  fullstack: { border: "#f97316", badge: "#f97316" },
  interactive: { border: "#a855f7", badge: "#a855f7" },
  frontend: { border: "#3b82f6", badge: "#3b82f6" },
};

export default function Projects() {
  const grouped = projectCategories
    .map((cat) => ({
      ...cat,
      projects: projectsData.filter((p) => p.category === cat.id),
    }))
    .filter((g) => g.projects.length > 0);

  return (
    <div className="projects-page">
      <div className="projects-page__bg" />

      <nav className="projects-page__nav">
        <Link to="/" className="projects-page__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Museum
        </Link>
      </nav>

      <div className="projects-page__content">
        <header className="projects-page__header">
          <h1 className="projects-page__title">Projects</h1>
          <p className="projects-page__subtitle">
            {projectsData.length} projects shipped — from full-stack platforms
            and e-commerce engines to immersive 3D worlds and creative frontends.
          </p>
        </header>

        <div className="projects-page__grid">
          {grouped.map((group) => (
            <section key={group.id} className="projects-page__group">
              <h2 className="projects-page__group-title">{group.label}</h2>
              <div className="projects-page__cards">
                {group.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    accent={categoryAccents[project.category]}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="projects-page__footer">
          <a
            href="https://github.com/Cursed-Coder777"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-page__footer-link"
          >
            View all on GitHub →
          </a>
        </footer>
      </div>
    </div>
  );
}

function ProjectCard({ project, accent }) {
  return (
    <article
      className="project-card"
      style={{ borderColor: accent.border }}
    >
      <div className="project-card__header">
        <h3 className="project-card__name">{project.name}</h3>
        <div className="project-card__links">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              title="Live site"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              title="Source code"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <p className="project-card__description">{project.description}</p>

      <div className="project-card__tech">
        {project.tech.map((t) => (
          <span
            key={t}
            className="project-card__tech-badge"
            style={{ backgroundColor: accent.badge + "1a", color: accent.badge }}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
