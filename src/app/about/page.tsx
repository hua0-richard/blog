export default async function About() {
  const { default: Post } = await import(`@/markdown/all-md-notes/about.mdx`);
  return (
    <div className="w-full flex justify-center">
      <div className="w-3/5">
        <Post/>
      </div>
    </div>
  )
}

