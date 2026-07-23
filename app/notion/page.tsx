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
      <h1 className="mb-6 text-2xl font-semibold">ข้อมูลของขาวชมรม</h1>
      {members.length === 0 && <p className="text-gray-600">ไม่พบข้อมูลของขาวชมรม</p>}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-[120px_1fr_160px_100px] border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
          <div>รหัส</div>
          <div>ชื่อ</div>
          <div>สาขา</div>
          <div>ปี</div>
        </div>

        {members.map((member) => (
          <div
            key={`${member.id}-${member.member_name}`}
            className="grid grid-cols-[120px_1fr_160px_100px] border-b border-gray-100 px-4 py-3 text-sm text-gray-700 last:border-b-0"
          >
            <div>{member.id}</div>
            <div>{member.member_name}</div>
            <div>{member.major}</div>
            <div>{member.year}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
