import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const page = await notion.pages.retrieve({ page_id: id });

    // Extract data from the page properties
    const properties = (page as Record<string, unknown>).properties as Record<
      string,
      {
        type: string;
        rich_text?: Array<{ plain_text: string }>;
      }
    >;

    const imageLinksProperty = properties["Image Links"];
    let cardData = null;

    if (imageLinksProperty && imageLinksProperty.type === "rich_text") {
      const richText = imageLinksProperty.rich_text;
      if (richText && richText.length > 0) {
        try {
          const fullText = richText
            .map((rt: { plain_text: string }) => rt.plain_text)
            .join("");
          cardData = JSON.parse(fullText);
        } catch {
          cardData = null;
        }
      }
    }

    return NextResponse.json({ cardData, success: true });
  } catch (error: unknown) {
    console.error("Error fetching from Notion:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch card";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
