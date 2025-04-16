export default async function Home() {
  const { default: Post } = await import(`@/markdown/all-md-notes/home.mdx`);

  return <div className="w-full flex justify-center">
    <div className="w-3/5 h-full flex flex-col">
      <Post />
      <div>
        Footer
      </div>
    </div>
  </div>;
}
