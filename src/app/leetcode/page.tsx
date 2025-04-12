import fs from "fs/promises";
import path from "path";
import Link from "next/link";

async function getMDXFiles() {
  const mdxDirectory = path.join(process.cwd(), "src/markdown/all-md-notes");
  const files = await fs.readdir(mdxDirectory);
  return files.filter((file) => file.endsWith(".mdx"));
}

export default async function LeetCode() {
  const files = await getMDXFiles();

  const difficultyToColor = {
    "Easy": "Easy",
    "Medium": "Medium",
    "Hard": "Hard",
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
              const slug = file.replace(".mdx", "");
              return (
                <tr key={file} className={`${index % 2 === 0 ? 'bg-black' : 'bg-neutral-900'}`}>
                    <td className="py-2 px-2">
                      <Link href={`/all-md-notes/${slug}`} className="text-white hover:text-blue-400 transition-colors duration-200 block w-full">{slug}</Link>
                    </td>
                    <td className="py-2 px-2">Easy</td>
                    <td className="py-2 px-2">Array</td>
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
