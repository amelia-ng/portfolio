import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";

const Home = ({ main_section, publications = [], projects = [] }) => {
  const contactInfo = {
    university: "MS Data Science at University of Michigan-Dearborn",
    mail: "amelianguyen.ds@gmail.com",
    location: "Detroit, MI",
    linkedin: "https://www.linkedin.com/in/ameliang12/",
    linkedinLabel: "in/ameliang12",
    github: "https://github.com/amelia-ng",
    githubLabel: "amelia-ng",
  };

  return (
    <Base>
      <section className="home-intro section pt-10">
        <div className="container">
          <div className="row items-start">
            <aside className="mb-10 lg:col-3 lg:mb-0">
              <div className="profile-sidebar px-5 py-6 text-center">
                <ImageFallback
                  className="profile-photo mx-auto mb-6 rounded object-cover"
                  src="/images/banner-photo-final.png"
                  width={220}
                  height={275}
                  priority
                  alt="Amelia Nguyen"
                />
                <ul className="space-y-4 text-left">
                  <li className="profile-detail">
                    <FaUniversity />
                    <span>{contactInfo.university}</span>
                  </li>
                  <li className="profile-detail">
                    <FaMapMarkerAlt />
                    <span>{contactInfo.location}</span>
                  </li>
                  <li className="profile-detail">
                    <FaEnvelope />
                    <Link href={`mailto:${contactInfo.mail}`}>
                      {contactInfo.mail}
                    </Link>
                  </li>
                  <li className="profile-detail">
                    <FaLinkedin />
                    <Link
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactInfo.linkedinLabel}
                    </Link>
                  </li>
                  <li className="profile-detail">
                    <FaGithub />
                    <Link
                      href={contactInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contactInfo.githubLabel}
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="lg:col-9">
              {main_section && (
                <div className="mb-10">
                  <div id="main-section">
                    {main_section.header &&
                      markdownify(main_section.header, "h1", "section-title mb-6")}
                    {main_section.subheader &&
                      markdownify(main_section.subheader, "h2", "mb-0")}
                  </div>
                  <div className="rounded border border-border px-5 pt-4 dark:border-darkmode-border">
                    <div className="row">
                      {main_section.paragraphs?.map((p, i) => (
                        <div
                          key={i}
                          className="mb-3 md:col-12"
                        >
                          {markdownify(
                            p,
                            "p",
                            "text-base md:text-lg leading-relaxed"
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <section id="resume" className="mt-12">
                {markdownify("Resume", "h1", "section-title mb-6")}
                <a className="home-action-link inline-block rounded border border-primary px-6 py-3 font-semibold text-primary transition duration-200" href={`https://drive.google.com/file/d/1pXM2LsyftuLeDvuegB7fHSsM8xXa8lCG/view?usp=sharing`} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </section>
              <section id="publication" className="mt-12">
                {markdownify("Publications", "h1", "section-title mb-6")}
                {publications.length ? (
                  <ol className="w-full list-decimal space-y-6 pl-6">
                    {publications.map((publication, index) => (
                      <li key={publication.title || index} className="publication-entry">
                        <h3 className="publication-title mb-1">{publication.link ? <a href={publication.link}>{publication.title}</a> : publication.title}</h3>
                        {publication.authors && markdownify(publication.authors, "p", "mb-1")}
                        {(publication.venue || publication.paper_url) && (
                          <p className="mb-0">
                            {publication.venue && markdownify(`${publication.venue}${publication.year ? ` · ${publication.year}` : ""}`, "span")}
                            {publication.paper_url && <>{publication.venue && " | "}<a href={publication.paper_url} target="_blank" rel="noopener noreferrer">paper</a></>}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : <p>Research publications will be added here.</p>}
              </section>
              <section id="projects" className="mt-12">
                {markdownify("Projects", "h1", "section-title mb-8")}
                <div className="row">
                  {projects.map((project) => {
                    const href = project.frontmatter.project_link || `/projects/${project.slug}`;
                    return (
                      <div className="mb-6 col-12" key={project.slug}>
                        <article className="home-project-card flex flex-col gap-4 rounded-xl border border-border bg-white p-4 shadow-sm transition duration-200 dark:border-darkmode-border dark:bg-darkmode-light lg:flex-row lg:items-start">
                          {project.frontmatter.image && <a href={href} target={project.frontmatter.project_link ? "_blank" : undefined} rel={project.frontmatter.project_link ? "noopener noreferrer" : undefined} className="block w-full shrink-0 lg:w-1/3"><ImageFallback className="aspect-[16/10] w-full rounded-lg object-cover" src={project.frontmatter.image} alt={project.frontmatter.title} width={640} height={420} /></a>}
                          <div className="flex min-w-0 flex-1 flex-col">
                            <h3 className="mb-1 text-xl font-medium"><a href={href} target={project.frontmatter.project_link ? "_blank" : undefined} rel={project.frontmatter.project_link ? "noopener noreferrer" : undefined}>{project.frontmatter.title}</a></h3>
                            {project.frontmatter.date && <p className="project-date mb-2">{dateFormat(project.frontmatter.date)}</p>}
                            <p className="project-description mb-3">{project.frontmatter.description || project.content}</p>
                            {project.frontmatter.key_achievements?.length > 0 && (
                              <div className="project-achievements">
                                <h4 className="mb-1 text-base font-semibold">Key Achievements</h4>
                                <ul className="list-disc space-y-1 pl-5">
                                  {project.frontmatter.key_achievements.map((achievement, index) => (
                                    <li key={`${project.slug}-achievement-${index}`}>{markdownify(achievement)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center"><Link href="/projects" className="home-action-link inline-block rounded border border-primary px-6 py-3 font-semibold text-primary transition duration-200">See more projects</Link></div>
      </section>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .profile-sidebar {
          position: sticky;
          top: 110px;
        }

        .profile-photo {
          aspect-ratio: 4 / 5;
          height: auto;
          max-width: 220px;
          width: clamp(130px, 16vw, 220px);
        }

        .profile-detail {
          align-items: flex-start;
          color: #191970;
          display: flex;
          gap: 0.75rem;
          line-height: 1.5;
          word-break: break-word;
        }
        
  .profile-detail span {
  color: #222;
  font-weight: 400;
}
  .profile-detail :global(svg) {
          flex: 0 0 auto;
          margin-top: 0.2rem;
        }


        @media (max-width: 991px) {
          .profile-sidebar {
            position: static;
          }

          .profile-photo {
            width: clamp(110px, 32vw, 180px);
          }
        }

        @media (max-width: 539px) {
          .profile-photo {
            width: clamp(90px, 42vw, 145px);
          }
        }
.home-intro :global(h1),
.home-intro :global(h2),
.home-intro :global(h3),
.home-intro :global(h4),
.home-intro :global(h5),
.home-intro :global(h6),
.home-intro :global(p),
.home-intro :global(span),
.home-intro :global(a),
.home-intro :global(li) {
    font-weight: 400 !important;
  }

.home-intro :global(p),
.home-intro :global(li) {
  font-size: 1rem;
  line-height: 1.55;
}
  
    .home-intro :global(*) {
    color: #222 !important;
  }
    .home-intro :global(a) {
  color: #0676cbff !important;
}

@media (min-width: 768px) {
  .home-intro :global(p),
  .home-intro :global(li) {
    font-size: 1.125rem;
  }
}

.home-intro :global(.home-project-card) {
  border-color: #dbe4f0;
}

.home-intro :global(.home-project-card:hover),
.home-intro :global(.home-project-card:focus-within) {
  border-color: #1d4ed8;
  box-shadow: 0 14px 32px rgba(29, 78, 216, 0.18);
  transform: translateY(-2px);
}

.home-intro :global(.home-action-link:hover),
.home-intro :global(.home-action-link:focus-visible) {
  border-color: #1d4ed8;
  box-shadow: 0 14px 32px rgba(29, 78, 216, 0.18);
  transform: translateY(-2px);
}

.home-intro :global(.project-description) {
  font-size: 0.95rem;
  line-height: 1.45;
}

.home-intro :global(.project-date),
.home-intro :global(.project-achievements li) {
  font-size: 0.9rem;
  line-height: 1.4;
}

.home-intro :global(.publication-entry),
.home-intro :global(.publication-entry p) {
  line-height: 1.35;
}

.home-intro :global(.publication-title) {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .home-intro :global(.publication-title) {
    font-size: 1.125rem;
  }
}

      `}</style>
    </Base>
  );
};

export default Home;

// Fetch homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { main_section, publications = [] } = frontmatter;
  const projects = sortByDate(getSinglePage("content/projects")).slice(0, 10);

  return {
    props: {
      main_section,
      publications,
      projects,
    },
  };
};
