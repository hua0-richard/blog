import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

async function getMDXFiles() {
  const mdxDirectory = path.join(process.cwd(), "src/markdown/all-md-notes");
  const files = await fs.readdir(mdxDirectory);
  
  const leetcodeFiles = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith(".mdx")) return null;
      
      const filePath = path.join(mdxDirectory, file);
      const content = await fs.readFile(filePath, "utf-8");
      
      // Parse frontmatter using gray-matter
      const { data } = matter(content);
      
      // Check if tags include leetcode
      if (data.tags && Array.isArray(data.tags) && data.tags.includes('leetcode')) {
        return {
          filename: file,
          data
        };
      }
      return null;
    })
  );

  return leetcodeFiles.filter(Boolean);
}

export default async function LeetCode() {
  const files = await getMDXFiles();

  const difficultyToColor = {
    "Easy": "text-green-500",
    "Medium": "text-yellow-500",
    "Hard": "text-red-500",
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/5">
        <h1 className="text-xl">LeetCode Solutions</h1>
        <div className="py-2 flex justify-between w-full text-xs">
          <button className="flex items-center text-xs border border-neutral-700 rounded p-1 w-fit">Filter</button>
          <button className="flex items-center text-xs border border-neutral-700 rounded p-1 w-fit">Sort</button>
        </div>
        <div className="text-sm">
          <table className="table-fixed w-full">
            <thead className="text-left">
              <tr>
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Difficulty</th>
                <th className="px-2 py-2">Tags</th>
              </tr>
            </thead>
            <tbody>
            {files.map((file, index) => {
              if (!file) return null;
              const slug = file.filename.replace(".mdx", "");
              return (
                <tr key={file.filename} className={`${index % 2 === 0 ? 'bg-black' : 'bg-neutral-900'}`}>
                    <td className="py-2 px-2">
                      <Link href={`/all-md-notes/${slug}`} className="text-white hover:text-blue-400 transition-colors duration-200 block w-full">{slug.replaceAll('_', " ")}</Link>
                    </td>
                    <td className={`py-2 px-2 ${difficultyToColor[file.data.difficulty as keyof typeof difficultyToColor] || ''}`}>
                      {file.data.difficulty || 'Unknown'}
                    </td>
                    <td className="py-2 px-2">{file.data.tags?.join(', ') || 'No tags'}</td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
