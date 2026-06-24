import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getListPage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";

const Home = ({ main_section, skills_section }) => {
  const contactInfo = {
    university: "University of Michigan - Dearborn",
    mail: "anhthng@umich.edu",
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

              {skills_section && (
                <div>
                  <div id="skill-section">
                    {skills_section.header &&
                      markdownify(skills_section.header, "h1", "section-title mb-6")}
                    {skills_section.subheader &&
                      markdownify(skills_section.subheader, "h2", "mb-0")}
                  </div>
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                    <div className="row">
                      {skills_section.paragraphs?.map((p, i) => (
                        <div
                          key={i}
                          className="mb-3 md:col-12"
                        >
                          {markdownify(
                            p,
                            "p",
                            "text-base md:text-lg leading-relaxed text-black dark:text-darkmode-light"
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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

        .profile-detail :global(svg) {
          flex: 0 0 auto;
          margin-top: 0.2rem;
        }

        .profile-detail span,
        .profile-detail :global(a) {
          color: #222;
          font-weight: 400;
        }

        .profile-detail :global(a:hover) {
          color: #191970;
          text-decoration: underline;
        }

        :global(.dark) .profile-detail span,
        :global(.dark) .profile-detail :global(a) {
          color: #ffff;
        }

        .home-intro :global(h1),
        .home-intro :global(h2),
        .home-intro :global(h3),
        .home-intro :global(h4),
        .home-intro :global(h5),
        .home-intro :global(h6),
        .home-intro :global(strong) {
          font-weight: 400;
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
      `}</style>
    </Base>
  );
};

export default Home;

// Fetch homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { main_section, skills_section } = frontmatter;

  return {
    props: {
      main_section,
      skills_section: skills_section || null,
    },
  };
};
