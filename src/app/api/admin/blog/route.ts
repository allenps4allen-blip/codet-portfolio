import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createPost, updatePost, listPosts, deletePost, type BlogPostInput } from "@/lib/blog";

async function isAdminAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const password = decoded.split(":").slice(1).join(":");
    return password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await listPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "create": {
        const { slug, status, category, coverImage, title, excerpt, content, author } = body;
        if (!title?.en && !title?.ar) {
          return NextResponse.json({ error: "Title required in at least one language" }, { status: 400 });
        }
        const input: BlogPostInput = {
          slug: slug || "",
          status: status || "draft",
          category: category || "general",
          coverImage: coverImage || "",
          title: { en: title?.en || "", ar: title?.ar || "" },
          excerpt: { en: excerpt?.en || "", ar: excerpt?.ar || "" },
          content: { en: content?.en || "", ar: content?.ar || "" },
          author: author || "CODET",
        };
        const post = await createPost(input);
        return NextResponse.json({ post });
      }

      case "update": {
        const { id, ...updates } = body;
        if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
        const post = await updatePost(id, updates);
        if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
        return NextResponse.json({ post });
      }

      case "delete": {
        const { id } = body;
        if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
        const ok = await deletePost(id);
        return NextResponse.json({ ok });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
