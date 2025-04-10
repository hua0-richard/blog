import fs from "fs/promises";
import path from "path";
import Link from "next/link";

async function getMDXFiles() {
  const mdxDirectory = path.join(process.cwd(), "src/markdown/leetcode");
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
        <table className="table-fixed w-full">
          <thead className="text-left">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Difficulty</th>
              <th className="py-2">Tags</th>
            </tr>
          </thead>
          <tbody>
          {files.map((file) => {
            const slug = file.replace(".mdx", "");
            return (
              <tr key={file}>
                  <td className="py-2">{slug}</td>
                  <td className="py-2">Easy</td>
                  <td className="py-2">Array</td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
