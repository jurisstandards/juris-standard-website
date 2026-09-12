import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

function getAuthClient(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: authHeader ? { Authorization: authHeader } : {} } }
  );
}

export async function GET() {
  try {
    const db = getServiceRoleClient();
    const { data, error } = await db
      .from("firm_applications")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authClient = getAuthClient(req);
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { firm_name, contact_name, contact_email } = body;
    if (!firm_name || !contact_name || !contact_email) {
      return NextResponse.json({ error: "firm_name, contact_name, contact_email are required" }, { status: 400 });
    }

    const db = getServiceRoleClient();
    const { data, error } = await db
      .from("firm_applications")
      .insert({ ...body, submitted_by_user_id: user.id, status: "pending" })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, admin_note, assigned_division, assigned_category, assigned_year } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const db = getServiceRoleClient();
    const { error } = await db
      .from("firm_applications")
      .update({
        status,
        admin_note,
        assigned_division,
        assigned_category,
        assigned_year,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const db = getServiceRoleClient();
    const { error } = await db.from("firm_applications").delete().eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
