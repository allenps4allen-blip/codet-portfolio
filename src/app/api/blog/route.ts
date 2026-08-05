import { NextResponse } from "next/server";
import { listPosts, getPostBySlug } from "@/lib/blog";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post || post.status !== "published") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    const posts = await listPosts({ status: "published" });
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
