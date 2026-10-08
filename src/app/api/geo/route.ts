import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Vercel and some other CDNs provide this header
  const country = req.headers.get("x-vercel-ip-country") || 
                  req.headers.get("cf-ipcountry") || 
                  "Global";
                  
  return NextResponse.json({ country });
}
