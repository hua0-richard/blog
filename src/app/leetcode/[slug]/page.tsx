export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/markdown/leetcode/${slug}.mdx`);

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/5">
        <Post/>
      </div>
    </div>
  );
}
