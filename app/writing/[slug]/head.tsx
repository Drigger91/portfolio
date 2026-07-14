import { getPost } from "../../portfolio/posts";

export default function Head({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const title = post ? `${post.meta.title} — Piyush Tiwari` : "Not found — Piyush Tiwari";
  const desc = post?.meta.blurb || "";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={post?.meta.title || "Not found"} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="article" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
