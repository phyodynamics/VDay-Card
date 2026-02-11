import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function POST(request: NextRequest) {
  try {
    const cardData = await request.json();

    const cardJson = JSON.stringify(cardData);
    const CHUNK_SIZE = 2000;
    const chunks = [];
    for (let i = 0; i < cardJson.length; i += CHUNK_SIZE) {
      chunks.push({
        text: { content: cardJson.substring(i, i + CHUNK_SIZE) },
      });
    }

    const page = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Date: {
          title: [
            {
              text: {
                content: new Date().toISOString(),
              },
            },
          ],
        },
        "Image Links": {
          rich_text: chunks,
        },
      },
    });

    return NextResponse.json({ id: page.id, success: true });
  } catch (error: unknown) {
    console.error("Error saving to Notion:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save card";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
