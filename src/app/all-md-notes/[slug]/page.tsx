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
      <div className="w-full flex justify-center">
        <div className="w-3/5">
          <Post />
          <div className="flex items-center space-x-2 text-sm border border-neutral-700 rounded p-2 w-fit">
            <VisibilityIcon fontSize="small" />
            Views
          </div>
        </div>
      </div>
    );
  } catch {
    return <div className="w-full flex justify-center">
      <div className="w-3/5">
        <h1>404</h1>
        <div>Page Not Found</div>
      </div>
    </div>
  }
}
