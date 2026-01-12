import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";

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


const Home = ({ banner, posts, promotion, main_section, more_about_me }) => {
  // Sort posts if needed
  const sortedPosts = sortByDate(posts);

  // Hardcoded contact / social info
  const contactInfo = {
    mail: "anhthng@umich.edu",
    location: "Detroit, MI",
    linkedin: "https://www.linkedin.com/in/ameliang12/",
    github: "https://github.com/thuyanhnx",
  };

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src="/images/banner-bg-shape.svg"
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />
        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div
              className={
                banner.image_enable
                  ? "mt-0 text-center lg:mt-0 lg:text-left lg:col-6"
                  : "mt-0 text-center lg:mt-0 lg:text-left lg:col-12"
              }
            >
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-4")}
              {banner.button?.enable && (
                <Link
                  href={banner.button.link}
                  rel={banner.button.rel}
                  target={banner.button.target || "_self"}
                  className="btn btn-primary mt-6"
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-0 lg:mb-0 lg:col-12">
              {main_section && (
                <div className="section pt-0">
                  <div id="main-section">
                    {main_section.header &&
                      markdownify(main_section.header, "h1", "section-title")}
                    {main_section.subheader &&
                      markdownify(main_section.subheader, "h2", "mb-0")}
                  </div>
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
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
                      className="btn btn-primary mt-4"
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Promotion */}
              {promotion.enable && (
                <div className="mb-0 text-center">
                  <ImageFallback
                    className="h-full w-full"
                    height={115}
                    width={100}
                    src={promotion.image}
                    alt="promotion"
                  />
                  

                  {/* Optional promotion button */}
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
              )}

              {/* Contact / Social */}
              <div className="section mb-0">
                <h2 className="section-title mb-0">Connect with Me!</h2>
                <div className="row">
                  {contactInfo.mail && (
                    <div className="md:col-6 lg:col-3">
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
              {/* More About Me Section */}
              {more_about_me?.length > 0 && (
                <div className="section pt-0 pb-0">
                  <div className="row">
                    {more_about_me.map((paragraph, i) => (
                      <div key={i} className="md:col-12 mb-0 mt-0">
                        {markdownify(
                          paragraph,
                          "p",
                          "text-base md:text-lg leading-relaxed mb-0 mt-0"
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
  const { banner, featured_posts, recent_posts, promotion, main_section } =
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
      promotion,
      main_section,
      categories: categoriesWithPostsCount,
      more_about_me: frontmatter.more_about_me || null,
    },
  };
};