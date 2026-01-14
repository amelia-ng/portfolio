import Base from "@layouts/Baseof";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import Link from "next/link";
import ImageFallback from "@layouts/components/ImageFallback";
import themeConfig from "@config/theme.json";

const primaryColor = themeConfig.colors.default.theme_color.primary;

export default function ResumePage({ frontmatter, mdxSource }) {
  return (
    <Base>
      {/* Banner: title + button only */}
      <section className="section banner relative pb-5 text-center">
        {/* Background shape */}
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
            <div className="mt-14 text-center lg:mt-0 lg:col-12 text-center">
              {/* Title */}
              {frontmatter.title && (
                <h1 className="md:text-6xl lg:text-7xl font-extrabold mt-0 mb-6 text-center">
                  {frontmatter.title}
                </h1>
              )}

              {/* Button */}
              {frontmatter.button?.enable && (
                <Link
                  href={frontmatter.button.link}
                  target={frontmatter.button.target || "_self"}
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-2 mb-6"
                >
                  {frontmatter.button.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Markdown content below banner */}
      <section className="section, mt-1">
        <div className="container">
          <div className="row">
            <div className="lg:col-12 leading-relaxed mb-1 mr-9 lg:mr-27 ml-9 lg:ml-27">
              <MDXRemote
                {...mdxSource}
                components={{
                  h1: (props) => (
                    <h1
                      className="md:text-2xl lg:text-3xl font-extrabold mt-6 mb-3 w-full text-left -ml-6 md:-ml-8 lg:-ml-12"
                      style={{ color: "#186956ff" }} 
                      {...props}
                    />
                  ),
                  h2: (props) => (
                    <h2
                      className="md:text-xl lg:text-xl font-extrabold mt-2 mb-1"
                      {...props}
                    />
                  ),
                  h3: (props) => (
                    <h3
                      className="text-xl font-extrabold mt-1 mb-1"
                      {...props}
                    />
                  ),
                  h4: (props) => (
                    <h4
                      className="text-base font-italic mt-1 mb-0"
                      style={{ color:"#186956ff" }} 
                      {...props}
                    />
                  ),
                  p: (props) => (
                    <p className="text-base md:text-base lg:text-md leading-relaxed mb-1 mr-4 lg:mr-12" {...props} />
                  ),
                  ul: (props) => (
                    <ul className="list-disc text-base md:text-base lg:text-md pl-6 mb-4 leading-relaxed mb-1 mr-4 lg:mr-12" {...props} />
                  ),
                  li: (props) => (
                    <li className="mb-2 text-base md:text-base lg:text-md leading-relaxed leading-relaxed mb-1 mr-4 lg:mr-12" {...props} />
                  ),
                  strong: (props) => (
                    <strong className="font-bold text-black" {...props} />
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "content/resume.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data: frontmatter, content } = matter(fileContent);

  const mdxSource = await serialize(content);

  return {
    props: { frontmatter, mdxSource },
  };
}
