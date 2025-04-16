import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function getMDXFiles() {
  const mdxDirectory = path.join(process.cwd(), "src/markdown/all-md-notes");
  
  async function traverseDirectory(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return traverseDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
          return [fullPath];
        }
        return [];
      })
    );
    return files.flat();
  }

  const allMdxFiles = await traverseDirectory(mdxDirectory);
  
  const leetcodeFiles = await Promise.all(
    allMdxFiles.map(async (filePath) => {
      const content = await fs.readFile(filePath, "utf-8");
      const { data } = matter(content);
      
      if (data.tags && Array.isArray(data.tags) && data.tags.includes('leetcode')) {
        return {
          filename: path.relative(mdxDirectory, filePath),
          data
        };
      }
      return null;
    })
  );

  return leetcodeFiles.filter(Boolean);
} 