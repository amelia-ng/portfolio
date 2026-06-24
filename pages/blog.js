import React, { useState, useEffect, useRef } from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import { getSinglePage, getRegularPage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import Link from "next/link";
import dateFormat from "@lib/utils/dateFormat";

const { blog_folder, pagination, summary_length } = config.settings;
const { meta_author } = config.metadata;

const Blog = ({ posts, recent_posts, promotion }) => {
  const sortPostByDate = sortByDate(posts);
  const showPosts = pagination;

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

  const BlogCard = ({ post }) => {
    if (!post?.frontmatter) return null;

    const author = post.frontmatter.author || meta_author;
    const href = `/${blog_folder}/${post.slug}`;
    const titleHref = post.frontmatter.project_link || href;
    const isExternalTitle = Boolean(post.frontmatter.project_link);
    const TitleLink = ({ children }) =>
      isExternalTitle ? (
        <a href={titleHref} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <Link href={titleHref}>{children}</Link>
      );

    return (
      <article
        className="content-card flex flex-col gap-6 lg:flex-row"
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
          <Link href={href} className="w-full shrink-0 lg:w-auto">
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
          </Link>
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
            <TitleLink>
              <span className="cursor-pointer transition hover:text-primary">
                {post.frontmatter.title}
              </span>
            </TitleLink>
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "0.9rem",
              color: "#003f96ff",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            <span>{author}</span>
            <span>{dateFormat(post.frontmatter.date)}</span>
          </div>

          {post.content && (
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.7, color: "#334155" }}>
              {post.content.slice(0, Number(summary_length))}
            </p>
          )}
        </div>
      </article>
    );
  };

  return (
    <Base title="Blog">
      <section className="section">
        <div className="container">
          <div className="page-intro">
            <h1>Blog</h1>
            <Link
              href="https://medium.com/@ameliablog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border-2 border-[#191970] px-7 py-2 transition hover:border-blue-700"
            >
              View my Medium
            </Link>
          </div>
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-12 "
>
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

              {recent_posts.enable && (
                <div className="section pt-0">
                  <div className="rounded border border-border px-6 pt-6">
                    <div className="row">
                      {sortPostByDate.slice(0, visibleCount).map((post) => (
                        <div className="mb-8 col-12" key={post.slug}>
                          <BlogCard post={post} />
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
      <style jsx>{`
        .page-intro {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .page-intro h1 {
          font-size: 2.4rem;
          font-weight: 400;
          line-height: 1.2;
          margin: 0;
        }

        .page-action-box {
          background-color: #ffffff;
          border: 1.5px solid #0000ee;
          border-radius: 0.35rem;
          color: #0000ee;
          display: inline-flex;
          justify-content: center;
          padding: 0.45rem 0.85rem;
          text-decoration: underline;
          transition:
            background-color 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .page-action-box:hover,
        .page-action-box:focus-visible {
          background-color: #0000ee;
          border-color: #0000ee;
          color: #ffffff;
        }

        :global(.content-card) {
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease;
        }

        :global(.content-card:hover) {
          border-color: #1d4ed8 !important;
          box-shadow: 0 16px 36px rgba(29, 78, 216, 0.22) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </Base>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const page = await getRegularPage("blog");
  const { frontmatter } = page;
  const { recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/blog_posts`);

  return {
    props: {
      posts,
      recent_posts,
      promotion,
    },
  };
};
