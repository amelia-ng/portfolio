import Base from "@layouts/Baseof";
import { slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import { useSearchContext } from "context/state";
import { useRouter } from "next/router";

// Always return a STRING
const normalize = (value) => String(value ?? "");
const safeSlug = (value) => normalize(slugify(normalize(value)));

const SearchPage = () => {
  const router = useRouter();
  const rawKey = normalize(router.query?.key);
  const keyword = safeSlug(rawKey);

  const { posts } = useSearchContext();

  const searchResults = posts.filter((post) => {
    if (post?.frontmatter?.draft) return false;

    const title = safeSlug(post?.frontmatter?.title);
    const content = safeSlug(post?.content);

    const categories = Array.isArray(post?.frontmatter?.categories)
      ? post.frontmatter.categories.map(safeSlug)
      : [];

    return (
      title.includes(keyword) ||
      content.includes(keyword) ||
      categories.some((cat) => cat.includes(keyword))
    );
  });

  return (
    <Base title={rawKey ? `Search results for ${rawKey}` : "Search"}>
      <section className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Search results for{" "}
            <span className="text-primary">{rawKey || "…"}</span>
          </h1>

          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((post, i) => (
                <div key={`search-${i}`} className="col-12 mb-8 sm:col-6">
                  <Post post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-xl font-semibold shadow-sm">
              No results found
            </div>
          )}
        </div>
      </section>
    </Base>
  );
};

export default SearchPage;
