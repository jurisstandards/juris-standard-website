import re

filepath = r'd:\jurisstandard\src\lib\submissionStore.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_profile_data = """export interface ProfileData {
  identity: {
    // Professional
    fullName: string;
    preferredName: string;
    designation: string;
    organization: string;
    city: string;
    state: string;
    country: string;
    // Firm
    firmName: string;
    managingPartner: string;
    yearEstablished: string;
    hqCountry: string;
    hqCity: string;
    // Media & Tech
    orgName: string;
    editorInChief: string;
    founderCeo: string;
  };
  practice: {
    // Professional
    primaryPractice: string;
    secondaryPractices: string;
    yearsOfPractice: string;
    industries: string;
    jurisdiction: string;
    memberships: string;
    // Firm
    primaryPracticeAreas: string;
    secondaryPracticeAreas: string;
    officeLocations: string;
    firmSize: string;
    industriesServed: string;
    // Media
    primaryCoverageAreas: string;
    secondaryCoverageAreas: string;
    publicationFormats: string;
    geographicCoverage: string;
    teamSize: string;
    // Tech
    productCategory: string;
    practiceAreasServed: string;
    marketsServed: string;
    orgSize: string;
    industryFocus: string;
  };
  biography: {
    bio: string;
    firmHistory: string;
    publicationPhilosophy: string;
    companyInnovation: string;
  };
  presence: {
    website: string;
    linkedin: string;
    // Professional
    profileUrl: string;
    publications: string;
    // Firm
    firmProfile: string;
    publicationsInsights: string;
    // Media
    digitalPublication: string;
    newsletterPodcast: string;
    // Tech
    productPage: string;
    caseStudies: string;
  };
  documents: {
    suppUploaded: boolean;
    // Professional
    photoUploaded: boolean;
    cvUploaded: boolean;
    workUploaded: boolean;
    pubsUploaded: boolean;
    // Firm & Media & Tech
    logoUploaded: boolean;
    // Firm
    brochureUploaded: boolean;
    mattersUploaded: boolean;
    // Media
    mediaKitUploaded: boolean;
    samplePubsUploaded: boolean;
    // Tech
    companyProfileUploaded: boolean;
    productBrochureUploaded: boolean;
  };
}"""

new_initial_profile_data = """const initialProfileData: ProfileData = {
  identity: { 
    fullName: '', preferredName: '', designation: '', organization: '', city: '', state: '', country: '',
    firmName: '', managingPartner: '', yearEstablished: '', hqCountry: '', hqCity: '',
    orgName: '', editorInChief: '', founderCeo: ''
  },
  practice: { 
    primaryPractice: '', secondaryPractices: '', yearsOfPractice: '', industries: '', jurisdiction: '', memberships: '',
    primaryPracticeAreas: '', secondaryPracticeAreas: '', officeLocations: '', firmSize: '', industriesServed: '',
    primaryCoverageAreas: '', secondaryCoverageAreas: '', publicationFormats: '', geographicCoverage: '', teamSize: '',
    productCategory: '', practiceAreasServed: '', marketsServed: '', orgSize: '', industryFocus: ''
  },
  biography: { 
    bio: '', firmHistory: '', publicationPhilosophy: '', companyInnovation: '' 
  },
  presence: { 
    website: '', linkedin: '', profileUrl: '', publications: '',
    firmProfile: '', publicationsInsights: '',
    digitalPublication: '', newsletterPodcast: '',
    productPage: '', caseStudies: ''
  },
  documents: { 
    suppUploaded: false, photoUploaded: false, cvUploaded: false, workUploaded: false, pubsUploaded: false,
    logoUploaded: false, brochureUploaded: false, mattersUploaded: false,
    mediaKitUploaded: false, samplePubsUploaded: false,
    companyProfileUploaded: false, productBrochureUploaded: false
  },
};"""

content = re.sub(r'export interface ProfileData \{[\s\S]*?\}\s*\}', new_profile_data, content)
content = re.sub(r'const initialProfileData: ProfileData = \{[\s\S]*?\}\s*\};', new_initial_profile_data, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
