import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseWithAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: authHeader ? { Authorization: authHeader } : {},
    },
  });
}

export async function GET(req: NextRequest) {
  const supabase = getSupabaseWithAuth(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Deduplicate: get latest view per record_id
  const { data, error } = await supabase
    .from("user_recently_viewed")
    .select("*")
    .eq("user_id", user.id)
    .order("viewed_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Deduplicate client-side by record_id, keep latest
  const seen = new Set<string>();
  const deduped = (data ?? []).filter((r: { record_id: string }) => {
    if (seen.has(r.record_id)) return false;
    seen.add(r.record_id);
    return true;
  }).slice(0, 20);

  return NextResponse.json(deduped);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseWithAuth(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ success: false }); // silently ignore unauthenticated

  const body = await req.json();
  const { record_id, record_name, record_div, record_year } = body;
  if (!record_id) return NextResponse.json({ error: "record_id required" }, { status: 400 });

  await supabase.from("user_recently_viewed").insert({
    user_id: user.id,
    record_id,
    record_name,
    record_div,
    record_year,
  });

  return NextResponse.json({ success: true });
}
