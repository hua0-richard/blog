export default async function Home() {
  const { default: Post } = await import(`@/markdown/all-md-notes/home.mdx`);

  return (
    <>
      <Post />
      <div>Footer</div>
    </>
  );
}
