import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

const SECRET_REVALIDATE = process.env.SECRET_REVALIDATE;

type RevalidateBody = {
  type: "tags" | "page";
  tags: string[] | undefined;
  pages: string[] | undefined;
};

function isValidBody(body: unknown): body is RevalidateBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (b.type !== "tags" && b.type !== "page") return false;
  if (b.tags !== undefined && !Array.isArray(b.tags)) return false;
  if (b.pages !== undefined && !Array.isArray(b.pages)) return false;
  return true;
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("secret-revalidate");

  if (!SECRET_REVALIDATE || secret !== SECRET_REVALIDATE) {
    return NextResponse.json(
      { error: "Invalid or missing secret" },
      { status: 401 },
    );
  }

  let body: RevalidateBody;
  try {
    const parsed = await request.json();
    if (!isValidBody(parsed)) {
      return NextResponse.json(
        {
          error:
            "Invalid body: type must be 'tags' or 'page', tags and pages must be arrays or null",
        },
        { status: 400 },
      );
    }
    body = parsed;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  console.log("REVALUIDATE", body);

  try {
    if (body.type === "tags" && body.tags?.length) {
      for (const tag of body.tags) {
        revalidateTag(tag, "max");
      }
      return NextResponse.json({
        revalidated: true,
        type: "tags",
        count: body.tags.length,
      });
    }

    if (body.type === "page" && body.pages?.length) {
      for (const path of body.pages) {
        revalidatePath(path, "page");
      }
      return NextResponse.json({
        revalidated: true,
        type: "page",
        count: body.pages.length,
      });
    }

    return NextResponse.json(
      { error: "No tags or pages to revalidate for the given type" },
      { status: 400 },
    );
  } catch (err) {
    console.error("Revalidate error:", err);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
