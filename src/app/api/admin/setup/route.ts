import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json();
    if (!user_id) return NextResponse.json({ error: "Missing user_id" }, { status: 400 });

    // Verify the auth token from the request matches the user_id
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: { user }, error: authErr } = await anonClient.auth.getUser(token);
    if (authErr || !user || user.id !== user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check: if there's already an admin, don't allow (only first-time setup)
    const serviceClient = getServiceRoleClient();
    const { data: existingAdmins } = await serviceClient
      .from("profiles")
      .select("id")
      .eq("role", "admin");

    // Allow if: no admins exist yet, OR this user is already admin
    const alreadyAdmin = existingAdmins?.some(a => a.id === user_id);
    const noAdminsYet = !existingAdmins || existingAdmins.length === 0;

    if (!noAdminsYet && !alreadyAdmin) {
      return NextResponse.json(
        { error: "Admin already exists. Contact your admin to grant access." },
        { status: 403 }
      );
    }

    // Upsert the profile with admin role
    const { error: updateError } = await serviceClient
      .from("profiles")
      .upsert({ id: user_id, email: user.email, role: "admin" }, { onConflict: "id" });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Admin role granted." });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
