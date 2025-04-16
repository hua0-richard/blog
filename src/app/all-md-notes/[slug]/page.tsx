import VisibilityIcon from '@mui/icons-material/Visibility';
import { notFound } from 'next/navigation';

export default async function MdNotesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  try {
    const { default: Post } = await import(`@/markdown/all-md-notes/${slug}.mdx`);
    
    return (
      <>
          <Post />
          <div className="flex items-center space-x-2 text-sm border border-neutral-700 rounded p-2 w-fit">
            <VisibilityIcon fontSize="small" />
            Views
          </div>
      </>
    );
  } catch {
    return <>
        <h1>404</h1>
        <div>Page Not Found</div>
      </>
  }
}
