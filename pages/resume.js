import Base from "@layouts/Baseof";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import Link from "next/link";
import themeConfig from "@config/theme.json";
import { useState } from "react";

const primaryColor = themeConfig.colors.default.theme_color.primary;

export default function ResumePage({ frontmatter, mdxSource }) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Base title={frontmatter.title}>
      {/* Resume Content */}
      <section className="section">
        <div className="container">
          <div className="page-intro">
            <h1>{frontmatter.title}</h1>
            {frontmatter.button?.enable && (
              <Link
                href={frontmatter.button.link}
                target={frontmatter.button.target || "_self"}
                rel="noopener noreferrer"
                className="page-action-box inline-flex items-center rounded-lg border-2 border-[#191970] px-7 py-2 transition hover:border-blue-700"
              >
                {frontmatter.button.label}
              </Link>
            )}
          </div>
          <div className="row">
            <div
              className="lg:col-12"
              style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "64rem" }}
            >
              <MDXRemote
                {...mdxSource}
                components={{

                  /* ── Collapsible section toggle ── */
                  Section: ({ title, children }) => {
                    const isOpen = openSections[title] ?? true;
                    return (
                      <div style={{ marginBottom: "1rem" }}>
                        <h2
                          onClick={() => toggleSection(title)}
                          style={{
                            color: primaryColor,
                            fontSize: "1.5rem",
                            fontWeight: 400,
                            marginTop: "2rem",
                            marginBottom: "1.57rem",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {title}
                          <span style={{ fontSize: "2.1rem", lineHeight: 0.7 }}>
                            {isOpen ? "−" : "+"}
                          </span>
                        </h2>
                        {isOpen && children}
                      </div>
                    );
                  },

                  /* ── Timeline: vertical line on left, cards float right ── */
                  Timeline: ({ children }) => (
                    <div
                      style={{
                        position: "relative",
                        paddingLeft: "2.5rem",
                        paddingTop: "0rem",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      {/* Vertical line */}
                      <div
                        style={{
                          position: "absolute",
                          left: "0.6rem",
                          top: 0,
                          bottom: 0,
                          width: "3px",

                          backgroundColor: primaryColor,
                          opacity: 0.35,
                        }}
                      />
                      {children}
                    </div>
                  ),

                  Card: ({ children }) => (
                    <div
                      style={{
                        borderRadius: "0.6rem",
                        border: "1px solid #001a4fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                        background: "#ffffff",
                        padding: "1rem 1.2rem",
                      }}
                    >
                      {children}
                    </div>
                  ),

                  /* ── Entry: dot on line + card to the right ── */
                  Entry: ({ date, title, position, multiRole, children }) => (
                    <div
                      style={{
                        position: "relative",
                        marginBottom: "1.5rem",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Dot on the timeline */}
                      <div
                        style={{
                          position: "absolute",
                          left: "-2.25rem",
                          top: "0.5rem",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: "#ffffff",
                          border: `2.5px solid ${primaryColor}`,
                          zIndex: 1,
                        }}
                      />

                      {/* Floating card */}
                      <div
                        style={{
                          flex: 1,
                          borderRadius: "0.6rem",
                          border: "1px solid #001a4fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                          overflow: "hidden",
                          background: "#ffffff",
                        }}
                      >
                        {/* Card header */}
                        <div
                          style={{
                            padding: "0.9rem 1.2rem 0.7rem",
                            borderBottom: "1px solid #e5e7eb",
                            borderLeft: `4px solid ${primaryColor}`,
                          }}
                        >
                          {position && (
                            <p
                              style={{
                                color: primaryColor,
                                fontSize: "1rem",
                                fontWeight: 600,
                                letterHeight: 1.15,
                                textTransform: "uppercase",
                                margin: "0 0 0.25rem 0",
                              }}
                            >
                              {position}
                            </p>
                          )}
                          {title && (
                            <h4
                              style={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                margin: 0,
                                heightSpacing: 1.15,
                                color: "#111827",
                              }}
                            >
                              {title}
                            </h4>
                          )}
                          {date && (
                            <p
                              style={{
                                color: "#0e3fc7ff",
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                lineHeight: 1.4,
                                margin: "0.25rem 0 0",
                              }}
                            >
                              {date}
                            </p>
                          )}
                         
                        </div>

                        {children && (
                          <div
                            style={{
                              padding: multiRole
                                ? "0 1.2rem 1rem"
                                : "0.8rem 1.2rem 1rem",
                              fontSize: "1rem",
                            }}
                          >
                            {children}
                          </div>
                        )}
                      </div>
                    </div>
                  ),

                  /* A role and its dates inside a shared organization card. */
                  Role: ({ title, date, first, children }) => (
                    <div
                      style={{
                        marginTop: first ? 0 : "0.9rem",
                        paddingTop: "0.5rem",
                      }}
                    >
                      <h4
                        style={{
                          color: "#111827",
                          fontSize: "1rem",
                          fontWeight: 500,
                          lineHeight: 1.3,
                          margin: 0,
                        }}
                      >
                        {title}
                      </h4>
                      {date && (
                        <p
                          style={{
                            color: "#0e3fc7ff",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                            lineHeight: 1.4,
                            margin: "0.2rem 0 0.55rem",
                          }}
                        >
                          {date}
                        </p>
                      )}
                      {children}
                    </div>
                  ),

                  /* ── Base MDX element styles ── */
                  ul: ({ children }) => (
                    <ul
                      style={{
                        margin: "1.1rem 0 0",
                        paddingLeft: "1.5rem",
                        listStyleType: "disc",
                        listStylePosition: "outside",
                      }}
                    >
                      {children}
                    </ul>
                  ),

                  li: ({ children }) => (
                    <li
                      style={{
                        display: "list-item",
                        listStyle: "disc",
                        listStyleType: "disc",
                        fontSize: "1rem",
                        lineHeight: 1.3,
                        }}
                    >
                      {children}
                    </li>
                  ),

                  p: ({ children }) => (
                    <p style={{ fontSize: "1rem", lineHeight: 1.6, margin: "0 0 0.4rem" }}>
                      {children}
                    </p>
                  ),

                  h3: ({ children }) => (
                    <h3 style={{ color: primaryColor, fontSize: "1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>
                      {children}
                    </h3>
                  ),

                  h4: ({ children }) => (
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>
                      {children}
                    </h4>
                  ),
                }}
              />
            </div>
          </div>
          <div className="row">
            <div
              className="lg:col-12"
              style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "64rem" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "1em",
                  marginTop: "1rem",
                  maxWidth: "36rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Link
                  href="/projects"
                  className="resume-nav-box btn"
                  style={{
                    textAlign: "center",
                    backgroundColor: primaryColor,
                    color: "#ffffff",
                    borderColor: primaryColor,
                  }}
                >
                  Projects
                </Link>
                <Link
                  href="/blog"
                  className="resume-nav-box btn"
                  style={{
                    textAlign: "center",
                    backgroundColor: primaryColor,
                    color: "#ffffff",
                    borderColor: primaryColor,
                  }}
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
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
            font-size: 2rem;
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

          .resume-nav-box {
            transform: translateY(0);
            box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
            transition:
              transform 180ms ease,
              box-shadow 180ms ease,
              background-color 180ms ease;
          }

          .resume-nav-box:hover,
          .resume-nav-box:focus-visible {
            transform: translateY(-4px);
            box-shadow: 0 16px 30px rgba(15, 23, 42, 0.18);
            background-color: #12306d !important;
          }

          @media (max-width: 767px) {
            .resume-nav-box {
              width: 100%;
            }
          }
        `}</style>
      </section>
    </Base>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "content/resume.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);
  const mdxSource = await serialize(content);
  return { props: { frontmatter, mdxSource } };
}
