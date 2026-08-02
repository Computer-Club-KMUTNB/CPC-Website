import { getPages } from "@/lib/notion";
import { formatTextProperty } from "@/lib/utils";

type Blog = {
  title: string;
  id: string;
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
      id: formatTextProperty(properties["Blog ID"]),
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

      <div className="max-h-[120vh] max-w-[120vw] overflow-auto rounded-lg border border-gray-200 bg-white shadow-sm scrollbar-auto">
        <div className="grid grid-cols-[1fr_2fr_2fr_1fr_2fr] border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
          <div>รหัส</div>
          <div>ชื่อ</div>
          <div>ประเภท</div>
          <div>วันที่สร้าง</div>
          <div>ผู้เขียน</div>
        </div>

        {blogs.map((blog) => (
          <div
            key={`${blog.id}-${blog.title}`}
            className="grid grid-cols-[1fr_2fr_2fr_1fr_2fr] border-b border-gray-100 px-4 py-3 text-sm text-gray-700 last:border-b-0"
          >
            <div>{blog.id}</div>
            <div>{blog.title}</div>
            <div>{blog.type}</div>
            <div>{blog.created_at}</div>
            <div>{blog.author}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Blogs;

