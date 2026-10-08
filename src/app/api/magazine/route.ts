import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("magazine_pages")
      .select("*")
      .order("page_number", { ascending: true });

    if (error) {
      // If table doesn't exist yet, return mock data so the UI doesn't crash
      if (error.code === '42P01') { // undefined_table
        return NextResponse.json(getMockPages());
      }
      throw error;
    }
    
    return NextResponse.json(data?.length ? data : getMockPages());
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function getMockPages() {
  return [
    {
      id: "mock-1",
      page_number: 1,
      heading: "THE NEW ERA OF CROSS-BORDER LEGAL EXCELLENCE",
      content: "As global commerce becomes increasingly interconnected, the role of cross-border legal excellence has never been more critical. Leading law firms are navigating complex regulatory landscapes, harmonizing international standards, and driving forward innovative solutions that shape the future of global trade.\\n\\nThis issue explores the methodologies, standards, and visionary practices that define top-tier legal performance in 2024 and beyond."
    },
    {
      id: "mock-2",
      page_number: 2,
      heading: "1. THE GLOBAL STANDARD",
      content: "The Juris Standard™ evaluates law firms on multiple dimensions, including legal capability, professional standards, client service, market presence, and contribution to the legal profession.\\n\\nThe assessment is independent, objective and based on a combination of qualitative and quantitative research."
    },
    {
      id: "mock-3",
      page_number: 3,
      heading: "2. METHODOLOGY (OVERVIEW)",
      content: "**Research Inputs**\\nIndependent research, market analysis, client feedback and public domain information.\\n\\n**Evaluation Framework**\\nMulti-dimensional assessment covering capability, talent, innovation, client service, institutional strength and impact.\\n\\n**Expert Review**\\nAnalysis by the Juris Standard research team, with inputs from industry experts and market participants."
    },
    {
      id: "mock-4",
      page_number: 4,
      heading: "3. SCOPE AND LIMITATIONS",
      content: "This recognition is specific to the category and year indicated. It reflects the findings of The Juris Standard™ as at the date of issue and is subject to periodic review.\\n\\nIt does not constitute a warranty, endorsement or guarantee of future performance."
    }
  ];
}
