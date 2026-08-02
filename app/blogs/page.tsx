import { getPages } from "@/lib/notion";
import { formatTextProperty } from "@/lib/utils";
import Link from "next/link";

type Blog = {
  title: string;
  author: string;
  created_at: string;
  type: string;
};


async function getBlogs(): Promise<Blog[]> {
  const blogs = await getPages(process.env.NOTION_BLOGS_ID!);
  return blogs.map((post: any) => {
    const properties = post.properties ?? {};
    return {
      title: formatTextProperty(properties.Title),
      author: formatTextProperty(properties.Author),
      type: formatTextProperty(properties["Blog Type"]),
      created_at: formatTextProperty(properties["Created at"] ?? properties["Created_at"] ?? properties["created_at"]),
    };
  });
}

async function Blogs() {
  const blogs = await getBlogs();

  return (
    <main style={{ padding: "2rem" }}>
      <h1 className="mb-6 text-2xl font-semibold">ข้อมูลของขาวชมรม</h1>
      {blogs.length === 0 && <p className="text-gray-600">ไม่พบข้อมูลของขาวชมรม</p>}

      <div className="grid grid-columns-[1fr_1fr_1fr_1fr] rounded-lg border border-gray-200 bg-white shadow-sm">

        {blogs.map((blog) => (
          <div
            key={`${blog.title}`}
            className="border-b border-gray-100 px-4 py-6 text-sm text-gray-700 last:border-b-0 hover:bg-gray-50"
          >
            <div>
              <Link href={`/blogs/${blog.title}`} className="font-bold text-3xl">{blog.title}</Link>
            </div>
            <div>ประเภท: {blog.type}</div>
            <div>วันที่เขียน: {blog.created_at}</div>
            <div>ผู้เขียน: {blog.author}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Blogs;

