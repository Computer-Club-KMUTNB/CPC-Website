import { getPages } from "@/lib/notion";

type Member = {
  id: string;
  member_name: string;
  year: string;
  major: string;
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

function formatNumber(property: any): string {
  return property?.type === "number" ? String(property.number ?? "") : "";
}

function formatSelect(property: any): string {
  return property?.type === "select" ? property.select?.name ?? "" : "";
}

function sortMembers(members: any): Member[] {
  return [...members].sort((a, b) => a.id - b.id)

}

async function getMembers(): Promise<Member[]> {
  const members = await getPages(process.env.NOTION_DATABASE_ID!);

  return members.map((post: any) => {
    const properties = post.properties ?? {};

    return {
      id: formatUniqueId(properties.ID),
      member_name: formatTitle(properties.Name),
      year: formatNumber(properties.Year),
      major: formatSelect(properties.Major),
    };
  });
}

export default async function Notion() {
  const members = sortMembers(await getMembers());

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Infomation</h1>
      {members.length === 0 && <p>No members found.</p>}
      <ul>
        {members.map((member) => (
          <li className="flex border-2" key={`${member.id}-${member.member_name}`}>
            {`${member.id}: ${member.member_name}, ${member.major}, ${member.year}`}
          </li>
        ))}
      </ul>
    </main>
  );
}
