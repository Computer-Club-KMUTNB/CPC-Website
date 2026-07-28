import { getPages } from "@/lib/notion";

type Blog = {
  title: string;
  id: string;
  author: string;
  created_at: string;
  type: string;
};

function formatTitle(property: any): string {
  return property?.type === "title" ? property.title?.[0]?.plain_text || "Untitled" : "Untitled";
}

function formatUniqueId(property: any): string {
  if (property?.type === "unique_id") {
    const prefix = property.unique_id?.prefix ? `${property.unique_id.prefix}-` : "";
    return `${prefix}${property.unique_id?.number ?? ""}`;
  }

  return "";
}

function formatSelect(property: any): string {
  return property?.type === "select" ? property.select?.name ?? "" : "";
}

function formatPeople(property: any): string {
  if (property?.type !== "people" || !Array.isArray(property.people)) {
    return "";
  }

  return property.people
    .map((person: any) => person?.name || person?.person?.email || "")
    .filter(Boolean)
    .join(", ");
}

function formatDate(property: any): string {
  if (!property?.date?.start) {
    return "";
  }

  const date = new Date(property.date.start);
  if (Number.isNaN(date.getTime())) {
    return property.date.start;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

async function getBlogs(): Promise<Blog[]> {
  const blogs = await getPages(process.env.NOTION_BLOGS_ID!);
  return blogs.map((post: any) => {
    const properties = post.properties ?? {};
    return {
      title: formatTitle(properties.Title),
      id: formatUniqueId(properties.ID),
      author: formatPeople(properties.Author),
      type: formatSelect(properties.Type),
      created_at: formatDate(properties["Created at"] ?? properties["Created_at"] ?? properties["created_at"]),
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

