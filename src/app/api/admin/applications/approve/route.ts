import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";
import { CATEGORIES, normalizeDivision, tierForCategory } from "@/lib/adminConstants";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { application_id, assigned_category, assigned_year, admin_note } = body;
    // Always store the canonical division string the public pages filter on (with trademark symbol)
    const assigned_division = normalizeDivision(body.assigned_division);
    if (!application_id || !assigned_division || !assigned_category || !assigned_year) {
      return NextResponse.json({ error: "application_id, assigned_division, assigned_category, assigned_year required" }, { status: 400 });
    }

    if (!assigned_division) {
      return NextResponse.json({ error: `Unknown division: ${body.assigned_division}` }, { status: 400 });
    }
    if (!(CATEGORIES[assigned_division] ?? []).includes(assigned_category)) {
      return NextResponse.json({ error: `Category "${assigned_category}" does not belong to ${assigned_division}` }, { status: 400 });
    }

    const db = getServiceRoleClient();

    const { data: app, error: fetchErr } = await db
      .from("firm_applications")
      .select("*")
      .eq("id", application_id)
      .single();

    if (fetchErr || !app) return NextResponse.json({ error: "Application not found" }, { status: 404 });

    const baseSlug = slugify(app.firm_name);
    // Make unique: append year + random suffix to avoid overwriting a different firm with same name
    const id = `${baseSlug}-${assigned_year}-${Math.random().toString(36).slice(2, 6)}`;
    const allRecords = await db.from("juris_records").select("id").order("created_at");
    const count = (allRecords.data?.length ?? 0) + 1;
    const recognitionId = `JS-${assigned_division.slice(0, 3).toUpperCase().replace(/ /g, "")}-${assigned_year}-${String(count).padStart(3, "0")}`;

    const record = {
      id,
      recognitionId,
      name: app.firm_type === 'Legal Professional' ? app.contact_name : app.firm_name,
      type: app.firm_type || "law_firm",
      division: assigned_division,
      category: assigned_category,
      tier: tierForCategory(assigned_division, assigned_category),
      year: assigned_year,
      location: app.headquarters_city || "",
      jurisdiction: app.country || "India",
      practiceAreas: app.practice_areas ?? [],
      status: "active",
      badge: `RECOGNISED - ${assigned_year}`,
      logoType: "text",
      whyThisRecord: app.key_areas_for_recognition || "",
      // Link back to the submitting user so My Records page can filter correctly
      linked_user_id: app.submitted_by_user_id || null,
      linked_user_email: app.contact_email || null,
      sort_order: null,    // admin can set this later via Records panel
      is_visible: true,   // visible by default
      firmInfo: {
        firm_name: app.firm_type === 'Legal Professional' ? app.firm_name : "",
        designation: app.contact_designation || "",
        founded: app.year_established || "",
        size: app.firm_size || "",
        description: app.about_firm || "",
        website: app.website_url || "",
        partners: app.num_partners || "",
        lawyers: app.num_lawyers || "",
        offices: app.offices || "",
      },
      recognitionHistory: [],
      relatedRecords: [],
    };

    const { error: recErr } = await db.from("juris_records").upsert(record);
    if (recErr) throw recErr;

    const { error: updErr } = await db
      .from("firm_applications")
      .update({
        status: "approved",
        assigned_division,
        assigned_category,
        assigned_year,
        admin_note: admin_note || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", application_id);
    if (updErr) throw updErr;

    if (app.contact_email && process.env.RESEND_API_KEY) {
      await sendApprovalEmail(app.contact_email, app.contact_name, app.firm_name, assigned_division, assigned_year);
    }

    return NextResponse.json({ success: true, record_id: id });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

async function sendApprovalEmail(to: string, name: string, firmName: string, division: string, year: string) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Juris Standard <recognition@jurisstandard.com>",
        to,
        subject: `Congratulations — ${firmName} Recognised by Juris Standard`,
        html: `
          <div style="font-family: Georgia, serif; background: #050505; color: #FFFFF0; padding: 48px; max-width: 600px; margin: 0 auto;">
            <div style="border-bottom: 1px solid #CBAA69; padding-bottom: 24px; margin-bottom: 32px;">
              <p style="font-size: 10px; letter-spacing: 4px; color: #CBAA69; text-transform: uppercase; margin: 0 0 8px;">THE JURIS STANDARD</p>
              <h1 style="font-size: 24px; font-weight: 300; margin: 0;">Recognition Confirmed</h1>
            </div>
            <p style="color: #FFFFF0; opacity: 0.8; line-height: 1.7;">Dear ${name},</p>
            <p style="color: #FFFFF0; opacity: 0.8; line-height: 1.7;">
              We are pleased to inform you that <strong style="color: #CBAA69;">${firmName}</strong> has been officially recognised in the
              <strong style="color: #CBAA69;">${division}</strong> — ${year}.
            </p>
            <p style="color: #FFFFF0; opacity: 0.8; line-height: 1.7;">
              Your firm's record is now live on the Juris Standard Index. You may view, share, and embed your recognition badge at any time.
            </p>
            <div style="border: 1px solid #CBAA69; padding: 24px; margin: 32px 0; text-align: center;">
              <p style="font-size: 10px; letter-spacing: 3px; color: #CBAA69; text-transform: uppercase; margin: 0 0 8px;">RECOGNISED ${year}</p>
              <p style="font-size: 20px; font-weight: 300; margin: 0;">${firmName}</p>
            </div>
            <p style="font-size: 10px; letter-spacing: 2px; color: rgba(255,255,240,0.3); text-transform: uppercase; margin-top: 48px;">
              The Juris Standard — A mark of trust. A standard of distinction.
            </p>
          </div>
        `,
      }),
    });
  } catch {
  }
}
