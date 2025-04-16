export default async function About() {
  const { default: Post } = await import(
    `@/markdown/all-md-notes/projects.mdx`
  );
  return <Post />;
}
