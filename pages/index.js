import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Image from "next/image";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const { blog_folder, pagination } = config.settings;

const isExternalUrl = (url = "") => /^https?:\/\//i.test(url);

const Home = ({ banner, posts, main_section, skills_section,  experience, projects }) => {
  // Sort posts if needed
  const sortedPosts = sortByDate(posts);

  // Hardcoded contact / social info
  const contactInfo = {
    mail: "anhthng@umich.edu",
    location: "Detroit, MI",
    linkedin: "https://www.linkedin.com/in/ameliang12/",
    github: "https://github.com/amelia-ng",
  };

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-18 bg-primary dark:bg-primary min-h-[600px] flex items-center">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src=""
          width={1000}
          height={700}
          alt="banner-shape"
          priority
        />
        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div
              className={
                banner.image_enable
                  ? "mt-0 text-center  justify-center lg:mt-0 lg:text-left lg:col-6"
                  : "mt-0 text-center   justify-center lg:mt-0 lg:text-left lg:col-12"
              }
            >
              <div className="banner-title" style={{ color: "#ffffff" }}>
                {markdownify(banner.title, "h2", "font-bold", "text-white")}
                {markdownify(banner.title_small, "span", "font-bold", "text-white")}
              </div>
              {markdownify(banner.content, "p", "text-lg mt-8 mb-8 text-white")}
              {banner.button?.enable && (
                <Link
                  href={banner.button.link}
                  rel={banner.button.rel}
                  target={banner.button.target || "_self"}
                  className="btn text-primary mt-6  border_white text-white "
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-10 mb-8 mx-auto flex justify-center lg:col-5 lg:ml-auto lg:mr-0">
                <ImageFallback
                  className="mx-auto  justify-center object-contain"
                  src="/images/banner-photo-final.png"
                  width={400}
                  height={500}
                  priority
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="border-b border-border dark:border-darkmode-border "></div>
      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-0 lg:mb-0 lg:col-12">
              {main_section && (
                <div className="section pt-0">
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
                          className="mb-3 md:col-12 prose-strong:font-bold"
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
                  {/* Additional buttons if any */}
                  {main_section.buttons?.map((btn, i) => (
                    <Link
                      key={i}
                      href={btn.link}
                      target={btn.target || "_self"}
                      rel={btn.rel || "noopener noreferrer"}
                      className="btn btn-primary mt-0"
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              )}
      
        {/* Skills Content */}
      {skills_section && (
  <section className="section py-0">
    <div className="row">
      <div className="row items-start">
        <div className="mb-0 lg:mb-0">
          <div className="section pt-0 mb-2">
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
                    className="mb-3 md:col-12 prose-strong:font-bold"
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

            {skills_section.buttons?.map((btn, i) => (
              <Link
                key={i}
                href={btn.link}
                target={btn.target || "_self"}
                rel={btn.rel || "noopener noreferrer"}
                className="btn btn-primary mt-4"
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)}

{/* Experience Section 
{experience?.length > 0 && (
  <section className="section py-0">
    <div className="row">
      <div className="row items-start">
        <div className="mb-0 lg:mb-0">
          <div className="section pt-0">
            <div className="lg:col-12">
              
              <h2 id="experience" className="section-title">Experience</h2> 
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                  <h3 className="text-xl">{exp.title}</h3>
                  <p className="text-primary font-semibold mt-1">
                    {exp.company}
                  </p>
                  <p className="text-gray font-semibold mt-1">
                    {exp.date}
                  </p>
                  <p className="mt-2 p leading-relaxed mb-5">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)}*/}
{/* Projects Section  ==> Navigation*/}
{projects?.length > 0 && (
  <section className="section py-0">
    <div className="row">
      <div className="row items-start">
        <div className="mb-0 lg:mb-0 mt-0">

          <div>
            <div className="lg:col-12 text-center">
              <h1 className="section-title mb-8">View More</h1>
            </div>
            {/* Grid */}
            <div className="row">
              {projects.map((proj) => (
                <div key={proj.id} className="md:col-3 lg:col-4 mb-3">
                  {proj.link ? (
                    isExternalUrl(proj.link) ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-nav-link block h-full"
                      >
                        <div className="project-nav-card rounded bg-primary border border-border px-6 pt-6 pb-6 dark:border-darkmode-border text-center transition">
                          <h3 className="text-xl font-semibold text-primary" style ={{ fontWeight: 600, color: "#ffffffff" }}>
                            {proj.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed">
                            {proj.description}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <Link href={proj.link} className="project-nav-link block h-full">
                        <div className="project-nav-card rounded bg-primary border border-border px-6 pt-6 pb-6 dark:border-darkmode-border text-center transition">
                          <h3 className="text-xl font-semibold text-primary" style ={{ fontWeight: 600, color: "#ffffffff" }}>
                            {proj.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed">
                            {proj.description}
                          </p>
                        </div>
                      </Link>
                    )
                  ) : (
                    <div className="rounded border border-border px-6 pt-6 pb-6 dark:border-darkmode-border text-center">

                      <h3 className="text-lg font-bold text-primary">
                        {proj.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
      </section>
)}
      <style jsx>{`
        .project-nav-link {
          text-decoration: none;
        }

        .project-nav-card {
          transform: translateY(0);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
          transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            background-color 180ms ease;
        }

        .project-nav-link:hover .project-nav-card,
        .project-nav-link:focus-visible .project-nav-card {
          transform: translateY(-4px);
          box-shadow: 0 16px 30px rgba(15, 23, 42, 0.18);
          background-color: #12306d;
        }
      `}</style>
              {/* Promotion 
              {promotion.enable && (
                <div className="mb-0 text-center">
                  <ImageFallback
                    className="h-full w-full"
                    height={115}
                    width={100}
                    src={promotion.image}
                    alt="promotion"
                  />*/}
                  

                  {/* Optional promotion button 
                  {promotion.button?.enable && (
                    <Link
                      href={promotion.button.link}
                      target={promotion.button.target || "_self"}
                      rel={promotion.button.rel || "noopener noreferrer"}
                      className="btn btn-primary mt-0"
                    >
                      {promotion.button.label}
                    </Link>
                  )}
                </div>
              )} */}

              {/* Contact / Social */}
              <div className="section pt-10 pb-10 mt-5 mb-0">
                <h1 className="section-title text-center mb-5">Connect with me!</h1>
                <div className="row">
                  {contactInfo.mail && (
                    <div className="md:col-6 text-center lg:col-3">
                      <Link
                        href={`mailto:${contactInfo.mail}`}
                        className="my-4 flex h-[100px] items-center justify-center rounded border border-border p-4 text-primary dark:border-darkmode-border"
                      >
                        <FaEnvelope />
                        <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                          {contactInfo.mail}
                        </p>
                      </Link>
                    </div>
                  )}
                  {contactInfo.location && (
                    <div className="md:col-6 lg:col-3">
                      <span className="my-4 flex h-[100px] items-center justify-center rounded border border-border p-4 text-primary dark:border-darkmode-border">
                        <FaMapMarkerAlt />
                        <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                          {contactInfo.location}
                        </p>
                      </span>
                    </div>
                  )}
                  {contactInfo.linkedin && (
                    <div className="md:col-6 lg:col-3">
                      <Link
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="my-4 flex h-[100px] items-center justify-center rounded border border-border p-4 text-primary dark:border-darkmode-border"
                      >
                        <FaLinkedin />
                        <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                          LinkedIn
                        </p>
                      </Link>
                    </div>
                  )}
                  {contactInfo.github && (
                    <div className="md:col-6 lg:col-3">
                      <Link
                        href={contactInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="my-4 flex h-[100px] items-center justify-center rounded border border-border p-4 text-primary dark:border-darkmode-border"
                      >
                        <FaGithub />
                        <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                          GitHub
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// Fetch homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion, main_section, skills_section, experience, projects} =
    frontmatter;

  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner,
      posts,
      featured_posts,
      recent_posts,
      main_section,
      experience: experience || null,
      skills_section: skills_section || null,
      projects: projects || null,
      categories: categoriesWithPostsCount,
    },
  };
};
