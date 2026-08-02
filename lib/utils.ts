export function formatTextProperty(property: any): string {
  if (!property) {
    return "";
  }

  if (property.type === "title") {
    return property.title?.map((item: any) => item.plain_text).join("") ?? "";
  }

  if (property.type === "rich_text") {
    return property.rich_text?.map((item: any) => item.plain_text).join("") ?? "";
  }

  if (property.type === "unique_id") {
    const prefix = property.unique_id?.prefix ? `${property.unique_id.prefix}-` : "";
    return `${prefix}${property.unique_id?.number ?? ""}`;
  }

  if (property.type === "select") {
    return property.select?.name ?? "";
  }

  if (property.type === "multi_select") {
    return property.multi_select?.map((item: any) => item.name).join(", ") ?? "";
  }

  if (property.type === "status") {
    return property.status?.name ?? "";
  }

  if (property.type === "number") {
    return String(property.number ?? "");
  }

  if (property.type === "people" && Array.isArray(property.people)) {
    return property.people
      .map((person: any) => person?.name || person?.person?.email || "")
      .filter(Boolean)
      .join(", ");
  }

  if (property.type === "date" && property.date?.start) {
    return formatDate(property);
  }

  return "";
}

export function formatDate(property: any): string {
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