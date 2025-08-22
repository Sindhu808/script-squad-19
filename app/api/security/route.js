// app/api/security/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { url } = await req.json();

  // Dummy example: simulate security scan
  const result = {
    sqlInjection: false,
    xss: true,
    csrf: false,
  };

  return NextResponse.json({ success: true, url, result });
}
