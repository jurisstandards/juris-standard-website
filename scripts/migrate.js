const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const allFirms = [
    { name: "AZB &\nPARTNERS", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "SHARDUL\nAMARCHAND\nMANGALDAS", type: "Advocates & Solicitors", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'icon_text', tier: "01" },
    { name: "KHAITAN\n& CO", type: "Advocates since 1911", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "J. SAGAR\nASSOCIATES", type: "Advocates & Solicitors", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "III TRILEGAL", type: "Advocates", loc: "Bengaluru", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "CYRIL\nAMARCHAND\nMANGALDAS", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "NISHITH\nDESAI\nASSOCIATES", type: "Attorneys at Law", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "WADIA\nGHANDY\n& CO", type: "Solicitors & Advocates", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "CRAWFORD\nBAYLEY\n& CO", type: "Solicitors & Advocates", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "01" },
    { name: "LUTHRA AND\nLUTHRA LAW\nOFFICES", type: "New Delhi", loc: "", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "DUA\nASSOCIATES", type: "Advocates & Solicitors", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "SAMVĀD:\nPARTNERS", type: "Mumbai", loc: "", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "S&R\nASSOCIATES", type: "Advocates", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "INDUSLAW", type: "Advocates", loc: "Bengaluru", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "KOCHHAR\n& CO.", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "JURIS\nCORP", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "RAJANI\nASSOCIATES", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "VERITAS\nLEGAL", type: "Advocates", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "02" },
    { name: "PSL\nADVOCATES\n& SOLICITORS", type: "New Delhi", loc: "", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
    { name: "FOX\nMANDAL", type: "Bengaluru", loc: "", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
    { name: "THINK\nLEGAL", type: "Advocates", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'colored_text', tier: "03" },
    { name: "ag\nlaw", type: "New Delhi", loc: "", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
    { name: "P&A\nLAW OFFICES", type: "Mumbai", loc: "", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
    { name: "LEX\nORBIS", type: "Bengaluru", loc: "", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
    { name: "VICTORIAM\nLEGALIS", type: "Advocates", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
    { name: "SOLOMON\n& CO", type: "Solicitors & Advocates", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
    { name: "SCC\nLEGAL", type: "Advocates", loc: "Bengaluru", badge: "RECOGNISED - 2027", logoType: 'text', tier: "03" },
];

async function migrate() {
  console.log(`Found ${allFirms.length} records. Migrating to Supabase...`);
  
  for (let i = 0; i < allFirms.length; i++) {
    const rawFirm = allFirms[i];
    const id = rawFirm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    let category = "Principal Record";
    if (rawFirm.tier === "02") category = "Distinguished Law Firms";
    if (rawFirm.tier === "03") category = "Rising Law Firms";

    const record = {
      id,
      recognitionId: `JS-LFE-2027-${String(i + 1).padStart(3, '0')}`,
      name: rawFirm.name,
      type: "law_firm",
      division: "Law Firm Excellence™",
      category,
      tier: rawFirm.tier,
      year: "2027",
      location: rawFirm.loc || "India",
      jurisdiction: "India",
      practiceAreas: ["Corporate & Commercial", "Dispute Resolution"], // Mock default
      status: "active",
      badge: rawFirm.badge,
      logoType: rawFirm.logoType,
      whyThisRecord: `${rawFirm.name.replace(/\n/g, ' ')} has demonstrated exceptional legal capability across multiple practice areas, setting the benchmark for transactional excellence, client service, and professional leadership in the Indian legal market.`,
      firmInfo: {
        founded: "2000",
        size: "Full Service",
        description: `Recognised among the leading law firms in India.`
      },
      recognitionHistory: [],
      relatedRecords: []
    };

    const { error } = await supabase.from('juris_records').upsert(record);
      
    if (error) {
      console.error(`Error inserting ${record.id}:`, error.message);
    } else {
      console.log(`✅ Inserted: ${record.name.replace(/\n/g, ' ')}`);
    }
  }
  console.log('Migration complete!');
}

migrate();
