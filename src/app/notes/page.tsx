import Link from 'next/link';

export default function NotesPage() {
  const notes = [
    { title: 'Obsidian Features Demo', slug: 'obsidian-demo' },
  ];

  return (
    <div className="w-3/5 mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Notes</h1>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.slug} className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <Link 
              href={`/notes/${note.slug}`}
              className="text-xl font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 