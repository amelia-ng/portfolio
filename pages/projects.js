import React, { useState, useEffect, useRef } from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Post from "@layouts/partials/Post";
import { getSinglePage, getRegularPage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
const { blog_folder, pagination } = config.settings;

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

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-0 text-center">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src="images/banner-bg-shape.svg"
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container text-center">
          <div className="row">
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-6" : "mt-12 text-center lg:mt-0 lg:text-left lg:col-12"}>
              <div className="banner-title text-center">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              <div className = "banner-content text-center">
                {markdownify(banner.content, "p", "mt-4", "text-center")}
              </div>
              {banner.button.enable && (
                <div className="mt-2 flex justify-center">
                  <Link
                    className="btn btn-primary mt-1 mb-3 text-center"
                    target={banner.button.target || "_self"}
                    href={banner.button.link}
                    rel={banner.button.rel}
                  >
                    {banner.button.label}
                  </Link>
                </div>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6 text-center">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )}
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
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                    <div className="row">
                      {sortPostByDate.slice(0, visibleCount).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
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
