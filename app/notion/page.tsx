import { getPages } from "@/lib/notion";

export default async function Notion() {
  let posts = await getPages(process.env.NOTION_DATABASE_ID!
  );
  posts = posts.sort((a, b) => {
    const idA = a.properties?.ID?.unique_id?.number 
    const idB = b.properties?.ID?.unique_id?.number
    return idA - idB}
  )
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Infomation</h1>
      {posts.length === 0 && <p>No posts found.</p>}
      <ul>
        {posts.map((post: any) => {
          const nameProperty = post.properties?.Name;
          const idProperty = post.properties?.ID;
          const yearProperty = post.properties?.Year;
          const majorProperty = post.properties?.Major;

          const name = nameProperty?.type === "title" ? nameProperty.title[0]?.plain_text
            : "Untitled";
          let id = "";
          if (idProperty?.type == "unique_id") {
            const prefix = idProperty.unique_id.prefix ? `${idProperty.unique_id.prefix}-` : "";
            id = `${prefix}${idProperty.unique_id.number}`;
          }  
          const year = yearProperty?.type === "number" ? yearProperty.number : "";
          const major = majorProperty?.type === "select" ? majorProperty.select?.name : "";
          return <li className="flex border-2" key={post.id}>{`${id}: ${name}, ${major}, ${year}`}</li>;
        })}
      </ul>
    </main>
  );
}
