import Link from "next/link";
import ImageFallback from "./components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, image, button } = frontmatter;

  return (
    <section className="section mt-16">
      <div className="container text-left">

        {image && (
          <div className="mb-8">
            <ImageFallback
              src={image}
              width={1298}
              height={616}
              alt={title}
              className="rounded-lg"
            />
          </div>
        )}

        {/* Display button only if button object exists and enable is true */}
        {button && button.enable && button.link && (
          <div className="mb-6">
            <Link
              href={frontmatter.button.link}
              rel={frontmatter.button.rel || "noopener noreferrer"}
              target={frontmatter.button.target || "_self"}
              className="btn btn-primary"
            >
              {button.label || "Click Here"}
            </Link>
          </div>
        )}

        {title && markdownify(title, "h1", "h1 text-left lg:text-[80px] mt-12")}

        <div className="content text-left">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default About;
