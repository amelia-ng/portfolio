import React, { useState, useEffect, useRef } from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getSinglePage, getRegularPage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import Link from "next/link";
import dateFormat from "@lib/utils/dateFormat";

const { blog_folder, pagination } = config.settings;
const { meta_author } = config.metadata;

const Portfolio = ({
  banner,
  posts,
  recent_posts,
  promotion,
}) => {
  const sortPostByDate = sortByDate(posts);
  const showPosts = pagination;

  // Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(showPosts);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (visibleCount >= posts.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + pagination, posts.length));
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [visibleCount, posts.length]);

  const ProjectCard = ({ post }) => {
    if (!post?.frontmatter) return null;

    const author = post.frontmatter.author || meta_author;
    const description = post.frontmatter.description || post.content;
    const keyAchievements = Array.isArray(post.frontmatter.key_achievements)
      ? post.frontmatter.key_achievements
      : [];
    const externalLink = post.frontmatter.project_link;
    const internalLink = `/${blog_folder}/${post.slug}`;
    const href = externalLink || internalLink;
    const isExternal = Boolean(externalLink);

    const LinkWrapper = ({ children, className }) =>
      isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      );

    return (
      <article
        className="flex flex-col gap-6 lg:flex-row"
        style={{
          width: "100%",
          padding: "1.25rem",
          border: "1px solid #dbe4f0",
          borderRadius: "0.9rem",
          background: "#ffffff",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
          alignItems: "stretch",
        }}
      >
        {post.frontmatter.image && (
          <LinkWrapper className="w-full shrink-0 lg:w-auto">
            <div
              className="w-full lg:max-w-[320px]"
              style={{
                aspectRatio: "16 / 10",
                overflow: "hidden",
                borderRadius: "0.7rem",
              }}
            >
              <ImageFallback
                className="h-full w-full object-cover transition-opacity duration-200 hover:opacity-90"
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={640}
                height={420}
              />
            </div>
          </LinkWrapper>
        )}

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minWidth: 0,
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 300, margin: "0 0 0.6rem", lineHeight: 1.2 }}>
            <LinkWrapper>
              <span className="cursor-pointer transition hover:text-primary">
                {post.frontmatter.title}
              </span>
            </LinkWrapper>
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "0.9rem",
              color: "#475569",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            <span>{author}</span>
            <span>{dateFormat(post.frontmatter.date)}</span>
          </div>

          {description && (
            <p style={{ margin: "0 0 0.9rem", fontSize: "1rem", lineHeight: 1.7, color: "#334155" }}>
              {description}
            </p>
          )}

          {keyAchievements.length > 0 && (
            <div>
              <h4
                style={{
                  margin: "0 0 0.45rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                Key achievements
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.25rem",
                  color: "#334155",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  listStyleType: "disc",
                }}
              >
                {keyAchievements.map((item, index) => (
                  <li key={`${post.slug}-achievement-${index}`} style={{ marginBottom: "0.2rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-6 bg-primary dark:bg-primary min-h-[10px] flex items-center">
        <div className="container text-center" style={{ color: "#ffffff" }}>
          <div className="row">
            <div className="mt-14 lg:col-12">
              {banner.title && (
                <h1 className="text-6xl mt-0 mb-4" style={{ color: "#ffffff", fontWeight: 500 }}>
                  {banner.title}
                </h1>
              )}
              {banner.content && (
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "1.05rem",
                    margin: "0 auto 1.5rem",
                    maxWidth: "42rem",
                  }}
                >
                  {banner.content}
                </p>
              )}
              {banner.button?.enable && (
                <Link
                  href={banner.button.link}
                  target={banner.button.target || "_self"}
                  rel={banner.button.rel || "noopener noreferrer"}
                  className="btn mb-6"
                  style={{ color: "#ffffff", borderColor: "#ffffff" }}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio main (full width, no sidebar) */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-12">
              {/* Promotion */}
              {promotion.enable && (
                <Link href={promotion.link} className="section block pt-0">
                  <ImageFallback
                    className="h-full w-full"
                    height="115"
                    width="800"
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0">
                  <div className="rounded border border-border text-lg px-6 pt-6 dark:border-darkmode-border">
                    <div className="row">
                      {sortPostByDate.slice(0, visibleCount).map((post) => (
                        <div className="mb-8 col-12" key={post.slug}>
                          <ProjectCard post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={loaderRef} className="py-8 text-center">
                {visibleCount < posts.length ? (
                  <span className="text-sm text-muted">Loading more...</span>
                ) : (
                  <span className="text-sm text-muted">No more posts</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Portfolio;

export const getStaticProps = async () => {
  const page = await getRegularPage("portfolio");
  const { frontmatter } = page;
  const { banner, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/projects`);

  return {
    props: {
      banner: banner,
      posts: posts,
      recent_posts,
      promotion,
    },
  };
};
