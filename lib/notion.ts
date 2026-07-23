import { unstable_cache } from "next/cache";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const getCachedPages = unstable_cache(
  async (databaseId: string) => {
    if (!databaseId) {
      console.error("Missing NOTION_DATABASE_ID environment variable.");
      return [];
    }

    try {
      const dbMetadata: any = await notion.databases.retrieve({
        database_id: databaseId,
      });

      const dataSourceId = dbMetadata.data_sources?.[0]?.id;

      if (!dataSourceId) {
        console.error("No active data sources found inside this database container.");
        return [];
      }

      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
      });

      return response.results;
    } catch (error) {
      console.error("Error communicating with Notion API:", error);
      return [];
    }
  },
  ["notion-pages"],
  { revalidate: 60 }
);

export async function getPages(databaseId: string) {
  return getCachedPages(databaseId);
}