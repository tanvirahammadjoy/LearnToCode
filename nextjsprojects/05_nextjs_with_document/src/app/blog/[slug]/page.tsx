import Image from "next/image";

async function getPost(slug: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  // how to search for a post with a specific slug? The API doesn't support searching by slug, so we will just return the first post for demonstration purposes.
  // givme the first post uel https://jsonplaceholder.typicode.com/posts/1
  return res.json();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <div>
      <h1>Blog Post</h1>
      <h1>{post.title}</h1>
      <p>{post.id}</p>
      <p>{post.userId}</p>
      <p>{post.body}</p>
    </div>
  );
}
