import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("juris_records")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { data, error } = await supabase
      .from("juris_records")
      .upsert(body)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, id: body.id, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { getServiceRoleClient } = await import("@/lib/supabase");
    const body = await req.json();
    const { id, sort_order, is_visible, status } = body;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const db = getServiceRoleClient();
    const updatePayload: Record<string, unknown> = {};
    if (sort_order !== undefined) updatePayload.sort_order = sort_order === "" ? null : Number(sort_order);
    if (is_visible !== undefined) updatePayload.is_visible = Boolean(is_visible);
    if (status !== undefined) updatePayload.status = status;

    const { error } = await db.from("juris_records").update(updatePayload).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { error } = await supabase
      .from("juris_records")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
