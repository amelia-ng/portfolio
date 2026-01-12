import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";

const Post = ({ post }) => {
  if (!post || !post.frontmatter) return null;

  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;

  const author = post.frontmatter.author || meta_author;
  const externalLink = post.frontmatter.project_link;
  const internalLink = `/${blog_folder}/${post.slug}`;
  const href = externalLink || internalLink;
  const isExternal = Boolean(externalLink);

  const LinkWrapper = ({ children }) =>
    isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href}>{children}</Link>
    );

  return (
    <div className="post">
      {/* Image + featured tags */}
      <div className="relative">
        {post.frontmatter.image && (
          <LinkWrapper>
            <div className="cursor-pointer">
              <ImageFallback
                className="rounded transition hover:opacity-90"
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                width={405}
                height={208}
              />
            </div>
          </LinkWrapper>
        )}

        {/* CLICKABLE FEATURED TAGS */}
        {Array.isArray(post.frontmatter.categories) && (
          <ul className="absolute top-3 left-2 flex flex-wrap items-center z-10 item-center">
            {post.frontmatter.categories.map((tag, index) => (
              <li
                key={`tag-${index}`}
                className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white text-xs text-center items-center justify-center font-medium"
              >
                <Link
                  href={`/categories/${tag.replace(/\s+/g, "-").toLowerCase()}`}
                  className="capitalize"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Title (clickable) */}
      <h3 className="h5 mb-2 mt-4">
        <LinkWrapper>
          <span className="block cursor-pointer transition hover:text-primary">
            {post.frontmatter.title}
          </span>
        </LinkWrapper>
      </h3>

      {/* Meta */}
      <ul className="flex items-center space-x-4">
        <li className="inline-flex items-center font-secondary text-xs">
          <FaUserAlt className="mr-1.5" />
          {author}
        </li>
        <li className="inline-flex items-center font-secondary text-xs">
          <FaRegCalendar className="mr-1.5" />
          {dateFormat(post.frontmatter.date)}
        </li>
      </ul>

      {/* Summary */}
      {post.content && (
        <p className="mt-2">
          {post.content.slice(0, Number(summary_length))}
        </p>
      )}
    </div>
  );
};

export default Post;