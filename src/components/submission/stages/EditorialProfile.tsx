import { useSubmissionStore, ProfileData, Track } from "@/lib/submissionStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, UploadCloud, Edit2, ChevronLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SectionKey = keyof ProfileData;

const allCountries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
  "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (DRC)", "Congo (Republic)",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
  "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
  "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const getCityOptions = (country: string): string[] => {
  const cities: Record<string, string[]> = {
    "Afghanistan": ["Kabul", "Kandahar", "Herat", "Mazar-i-Sharif"],
    "Albania": ["Tirana", "Durrës", "Vlorë", "Shkodër"],
    "Algeria": ["Algiers", "Oran", "Constantine", "Annaba"],
    "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Tucumán", "Mar del Plata"],
    "Armenia": ["Yerevan", "Gyumri", "Vanadzor"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Gold Coast", "Darwin"],
    "Austria": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
    "Azerbaijan": ["Baku", "Ganja", "Sumqayit"],
    "Bahrain": ["Manama", "Riffa", "Muharraq"],
    "Bangladesh": ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi"],
    "Belgium": ["Brussels", "Antwerp", "Ghent", "Bruges", "Liège"],
    "Bhutan": ["Thimphu", "Phuentsholing", "Punakha"],
    "Bolivia": ["La Paz", "Santa Cruz", "Cochabamba", "Sucre"],
    "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Mostar"],
    "Botswana": ["Gaborone", "Francistown", "Maun"],
    "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Manaus", "Curitiba", "Recife", "Porto Alegre", "Belo Horizonte"],
    "Bulgaria": ["Sofia", "Plovdiv", "Varna", "Burgas"],
    "Cambodia": ["Phnom Penh", "Siem Reap", "Battambang"],
    "Cameroon": ["Yaoundé", "Douala", "Bamenda"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec City", "Winnipeg", "Halifax"],
    "Chile": ["Santiago", "Valparaíso", "Concepción", "Antofagasta"],
    "China": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Chongqing", "Wuhan", "Xi'an", "Hangzhou", "Nanjing", "Tianjin"],
    "Colombia": ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
    "Costa Rica": ["San José", "Alajuela", "Cartago"],
    "Croatia": ["Zagreb", "Split", "Rijeka", "Dubrovnik"],
    "Cuba": ["Havana", "Santiago de Cuba", "Holguín"],
    "Cyprus": ["Nicosia", "Limassol", "Larnaca", "Paphos"],
    "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzeň"],
    "Denmark": ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
    "Dominican Republic": ["Santo Domingo", "Santiago de los Caballeros"],
    "Ecuador": ["Quito", "Guayaquil", "Cuenca"],
    "Egypt": ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Port Said"],
    "Estonia": ["Tallinn", "Tartu", "Narva"],
    "Ethiopia": ["Addis Ababa", "Dire Dawa", "Gondar", "Mekelle"],
    "Finland": ["Helsinki", "Espoo", "Tampere", "Turku", "Oulu"],
    "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Nice", "Nantes", "Strasbourg", "Lille"],
    "Georgia": ["Tbilisi", "Kutaisi", "Batumi"],
    "Germany": ["Berlin", "Hamburg", "Munich", "Frankfurt", "Cologne", "Düsseldorf", "Stuttgart", "Leipzig", "Dresden", "Bonn"],
    "Ghana": ["Accra", "Kumasi", "Tamale", "Takoradi"],
    "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion"],
    "Guatemala": ["Guatemala City", "Quetzaltenango", "Escuintla"],
    "Hungary": ["Budapest", "Debrecen", "Miskolc", "Pécs", "Győr"],
    "Iceland": ["Reykjavik", "Akureyri"],
    "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kochi", "Chandigarh", "Bhopal", "Indore", "Nagpur", "Visakhapatnam", "Coimbatore", "Gurgaon", "Noida", "Agra", "Varanasi", "Patna"],
    "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar", "Semarang", "Palembang", "Bali (Denpasar)"],
    "Iran": ["Tehran", "Mashhad", "Isfahan", "Tabriz", "Shiraz", "Karaj"],
    "Iraq": ["Baghdad", "Basra", "Mosul", "Erbil", "Najaf"],
    "Ireland": ["Dublin", "Cork", "Galway", "Limerick", "Waterford"],
    "Israel": ["Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva"],
    "Italy": ["Rome", "Milan", "Naples", "Turin", "Florence", "Venice", "Bologna", "Genoa", "Palermo"],
    "Jamaica": ["Kingston", "Montego Bay", "Portmore"],
    "Japan": ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Sapporo", "Fukuoka", "Yokohama", "Hiroshima", "Sendai"],
    "Jordan": ["Amman", "Zarqa", "Irbid", "Aqaba"],
    "Kazakhstan": ["Almaty", "Astana", "Shymkent", "Karaganda"],
    "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    "Kuwait": ["Kuwait City", "Hawalli", "Farwaniya", "Salmiya"],
    "Kyrgyzstan": ["Bishkek", "Osh", "Jalal-Abad"],
    "Latvia": ["Riga", "Daugavpils", "Liepāja"],
    "Lebanon": ["Beirut", "Tripoli", "Sidon"],
    "Libya": ["Tripoli", "Benghazi", "Misrata"],
    "Lithuania": ["Vilnius", "Kaunas", "Klaipėda"],
    "Luxembourg": ["Luxembourg City", "Esch-sur-Alzette"],
    "Malaysia": ["Kuala Lumpur", "Penang", "Johor Bahru", "Ipoh", "Kota Kinabalu", "Kuching"],
    "Malta": ["Valletta", "Birkirkara", "Mosta"],
    "Mauritius": ["Port Louis", "Beau Bassin-Rose Hill", "Curepipe"],
    "Mexico": ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Cancún", "Mérida"],
    "Moldova": ["Chișinău", "Tiraspol", "Bălți"],
    "Mongolia": ["Ulaanbaatar", "Erdenet", "Darkhan"],
    "Montenegro": ["Podgorica", "Nikšić", "Budva"],
    "Morocco": ["Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir"],
    "Mozambique": ["Maputo", "Beira", "Nampula"],
    "Myanmar": ["Naypyidaw", "Yangon", "Mandalay"],
    "Namibia": ["Windhoek", "Swakopmund", "Walvis Bay"],
    "Nepal": ["Kathmandu", "Pokhara", "Lalitpur", "Bharatpur"],
    "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    "New Zealand": ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga"],
    "Nicaragua": ["Managua", "León", "Masaya"],
    "Nigeria": ["Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Benin City", "Enugu"],
    "North Korea": ["Pyongyang", "Hamhung", "Chongjin"],
    "Norway": ["Oslo", "Bergen", "Trondheim", "Stavanger"],
    "Oman": ["Muscat", "Salalah", "Sohar", "Sur"],
    "Pakistan": ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Quetta", "Multan", "Faisalabad"],
    "Palestine": ["Gaza", "Ramallah", "Nablus", "Hebron"],
    "Panama": ["Panama City", "Colón", "David"],
    "Papua New Guinea": ["Port Moresby", "Lae", "Mount Hagen"],
    "Paraguay": ["Asunción", "Ciudad del Este", "Luque"],
    "Peru": ["Lima", "Arequipa", "Trujillo", "Cusco"],
    "Philippines": ["Manila", "Cebu City", "Davao City", "Quezon City", "Makati", "Taguig", "Pasig"],
    "Poland": ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk"],
    "Portugal": ["Lisbon", "Porto", "Braga", "Funchal", "Coimbra"],
    "Qatar": ["Doha", "Al Wakrah", "Al Rayyan"],
    "Romania": ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța"],
    "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Vladivostok", "Samara"],
    "Rwanda": ["Kigali", "Butare", "Gisenyi"],
    "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Tabuk"],
    "Senegal": ["Dakar", "Thiès", "Saint-Louis"],
    "Serbia": ["Belgrade", "Novi Sad", "Niš", "Kragujevac"],
    "Singapore": ["Singapore"],
    "Slovakia": ["Bratislava", "Košice", "Prešov", "Žilina"],
    "Slovenia": ["Ljubljana", "Maribor", "Celje"],
    "Somalia": ["Mogadishu", "Hargeisa", "Kismayo"],
    "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein"],
    "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju"],
    "South Sudan": ["Juba", "Wau", "Malakal"],
    "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao", "Málaga", "Zaragoza"],
    "Sri Lanka": ["Colombo", "Kandy", "Galle", "Jaffna"],
    "Sudan": ["Khartoum", "Omdurman", "Port Sudan"],
    "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
    "Switzerland": ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
    "Syria": ["Damascus", "Aleppo", "Homs", "Latakia"],
    "Taiwan": ["Taipei", "Taichung", "Kaohsiung", "Tainan"],
    "Tajikistan": ["Dushanbe", "Khujand", "Kulob"],
    "Tanzania": ["Dar es Salaam", "Dodoma", "Arusha", "Mwanza"],
    "Thailand": ["Bangkok", "Chiang Mai", "Pattaya", "Phuket", "Hat Yai"],
    "Tunisia": ["Tunis", "Sfax", "Sousse", "Kairouan"],
    "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya"],
    "Turkmenistan": ["Ashgabat", "Türkmenabat", "Mary"],
    "Uganda": ["Kampala", "Gulu", "Lira", "Mbarara"],
    "Ukraine": ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"],
    "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
    "United Kingdom": ["London", "Manchester", "Birmingham", "Leeds", "Edinburgh", "Glasgow", "Bristol", "Liverpool", "Sheffield", "Nottingham", "Cardiff", "Belfast"],
    "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Washington D.C.", "San Francisco", "Seattle", "Denver", "Boston", "Atlanta", "Miami", "Las Vegas"],
    "Uruguay": ["Montevideo", "Salto", "Paysandú"],
    "Uzbekistan": ["Tashkent", "Samarkand", "Namangan", "Bukhara"],
    "Venezuela": ["Caracas", "Maracaibo", "Valencia", "Barquisimeto"],
    "Vietnam": ["Ho Chi Minh City", "Hanoi", "Da Nang", "Haiphong", "Can Tho"],
    "Yemen": ["Sanaa", "Aden", "Taiz", "Hodeidah"],
    "Zambia": ["Lusaka", "Ndola", "Kitwe", "Livingstone"],
    "Zimbabwe": ["Harare", "Bulawayo", "Mutare", "Gweru"],
  };
  return cities[country] || [];
};


export function EditorialProfile() {
  const { profileData, updateProfileData, setStage, selectedTrack } = useSubmissionStore();
  const [activeSection, setActiveSection] = useState<SectionKey>('identity');
  const [completedSections, setCompletedSections] = useState<SectionKey[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getSections = (track: Track) => {
    switch (track) {
      case 'law_firm_excellence':
        return [
          { id: 'identity', title: 'Section A', subtitle: 'Firm Identity' },
          { id: 'practice', title: 'Section B', subtitle: 'Practice Areas' },
          { id: 'biography', title: 'Section C', subtitle: 'Firm Profile' },
          { id: 'presence', title: 'Section D', subtitle: 'Firm Presence' },
          { id: 'documents', title: 'Section E', subtitle: 'Supporting Information' }
        ];
      case 'legal_innovation':
        return [
          { id: 'identity', title: 'Section A', subtitle: 'Organisation Identity' },
          { id: 'practice', title: 'Section B', subtitle: 'Innovation Profile' },
          { id: 'biography', title: 'Section C', subtitle: 'Company Overview' },
          { id: 'presence', title: 'Section D', subtitle: 'Digital Presence' },
          { id: 'documents', title: 'Section E', subtitle: 'Supporting Documents' }
        ];
      default: // corporate_elite, litigation_masters, women_leaders, future_leaders
        return [
          { id: 'identity', title: 'Section A', subtitle: 'Professional Identity' },
          { id: 'practice', title: 'Section B', subtitle: 'Professional Practice' },
          { id: 'biography', title: 'Section C', subtitle: 'Editorial Biography' },
          { id: 'presence', title: 'Section D', subtitle: 'Professional Presence' },
          { id: 'documents', title: 'Section E', subtitle: 'Supporting Information' }
        ];
    }
  };

  const sections = getSections(selectedTrack);

  const validateSection = (section: SectionKey): boolean => {
    switch (section) {
      case 'identity':
        if (selectedTrack === 'law_firm_excellence') {
          return !!(profileData.identity.firmName && profileData.identity.managingPartner && profileData.identity.email && profileData.identity.yearEstablished && profileData.identity.country && profileData.identity.hqCity);
        }
        if (selectedTrack === 'legal_innovation') {
          return !!(profileData.identity.orgName && profileData.identity.founderCeo && profileData.identity.email && profileData.identity.country && profileData.identity.city);
        }
        // Professional
        return !!(profileData.identity.fullName && profileData.identity.email && profileData.identity.mobile && profileData.identity.designation && profileData.identity.country && profileData.identity.city);
      
      case 'practice':
        if (selectedTrack === 'law_firm_excellence') {
          return !!(profileData.practice.primaryPracticeAreas && profileData.practice.officeLocations && profileData.practice.firmSize);
        }
        if (selectedTrack === 'legal_innovation') {
          return !!(profileData.practice.primaryInnovationArea && profileData.practice.productCategory && profileData.practice.practiceAreasServed && profileData.practice.marketsServed && profileData.practice.orgSize);
        }
        // Professional
        return !!(profileData.practice.primaryPracticeAreas && profileData.practice.yearsOfPractice);
      
      case 'biography':
        return true; // entirely optional
      
      case 'presence':
        return true; // entirely optional
      
      case 'documents':
        if (selectedTrack === 'law_firm_excellence') {
          return !!(profileData.documents.photoUploaded);
        }
        return !!(profileData.documents.photoUploaded && profileData.documents.cvUploaded);

        
      default:
        return true;
    }
  };

  const handleContinue = (current: SectionKey, next: SectionKey | 'review') => {
    setError(null);
    if (!validateSection(current)) {
      setError("Please fill in all mandatory fields before continuing.");
      return;
    }

    if (!completedSections.includes(current)) {
      setCompletedSections([...completedSections, current]);
    }
    if (next === 'review') {
      setStage('review');
    } else {
      setActiveSection(next);
    }
  };

  const ContinueButton = ({ onClick, text = "Continue Editorial Journey" }: { onClick: () => void, text?: string }) => (
    <div className="flex flex-col items-end mt-8 w-full">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex items-center space-x-2 text-red-500/90 text-xs mb-3"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </motion.div>
      )}
      <button 
        onClick={onClick}
        className="group relative inline-flex items-center justify-center px-6 py-3 bg-transparent border border-gold-500/30 text-white text-[0.6rem] md:text-[0.65rem] font-semibold uppercase tracking-[0.25em] rounded-sm overflow-hidden transition-colors duration-300 hover:border-gold-400 hover:bg-gold-500/5 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
      >
        <span className="relative z-10 flex items-center">
          {text}
          <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
  );

  const renderSectionContent = (section: SectionKey) => {
    switch (section) {
      case 'identity':
        if (selectedTrack === 'law_firm_excellence') {
          const hqCities = getCityOptions(profileData.identity.country);
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-xs font-light mb-4">Tell us about your law firm.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Firm Name" value={profileData.identity.firmName} onChange={(val) => updateProfileData('identity', { firmName: val })} required />
                <Input label="Managing Partner" value={profileData.identity.managingPartner} onChange={(val) => updateProfileData('identity', { managingPartner: val })} required />
                <Input label="Contact Email" value={profileData.identity.email} onChange={(val) => updateProfileData('identity', { email: val })} required />
                <Input label="Year Established" value={profileData.identity.yearEstablished} onChange={(val) => updateProfileData('identity', { yearEstablished: val })} required />
                <div className="hidden md:block"></div>
                <SelectInput 
                  label="Headquarters Country" 
                  value={profileData.identity.country} 
                  onChange={(val) => updateProfileData('identity', { country: val, hqCity: '' })} 
                  options={allCountries}
                  required
                />
                <SelectInput 
                  label="Headquarters City" 
                  value={profileData.identity.hqCity} 
                  onChange={(val) => updateProfileData('identity', { hqCity: val })} 
                  options={hqCities}
                  placeholder={profileData.identity.country ? "Search or type your city..." : "Please select a country first"}
                  required
                />
              </div>
              <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
            </div>
          );
        }

        if (selectedTrack === 'legal_innovation') {
          const cities = getCityOptions(profileData.identity.country);
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-xs font-light mb-4">Tell us about your organisation.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Organisation Name" value={profileData.identity.orgName} onChange={(val) => updateProfileData('identity', { orgName: val })} required />
                <Input label="Founder / CEO / Primary Contact" value={profileData.identity.founderCeo} onChange={(val) => updateProfileData('identity', { founderCeo: val })} required />
                <Input label="Contact Email" value={profileData.identity.email} onChange={(val) => updateProfileData('identity', { email: val })} required />
                <SelectInput 
                  label="Country" 
                  value={profileData.identity.country} 
                  onChange={(val) => updateProfileData('identity', { country: val, city: '' })} 
                  options={allCountries}
                  required
                />
                <SelectInput 
                  label="City" 
                  value={profileData.identity.city} 
                  onChange={(val) => updateProfileData('identity', { city: val })} 
                  options={cities}
                  placeholder={profileData.identity.country ? "Search or type your city..." : "Please select a country first"}
                  required
                />
              </div>
              <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
            </div>
          );
        }

        // Default Professional
        const cities = getCityOptions(profileData.identity.country);
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-xs font-light mb-4">Tell us how you are professionally known.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={profileData.identity.fullName} onChange={(val) => updateProfileData('identity', { fullName: val })} required />
              <Input label="Current Designation" value={profileData.identity.designation} onChange={(val) => updateProfileData('identity', { designation: val })} required />
              <Input label="Email Address" value={profileData.identity.email} onChange={(val) => updateProfileData('identity', { email: val })} required />
              <Input label="Mobile Number" value={profileData.identity.mobile} onChange={(val) => updateProfileData('identity', { mobile: val })} required />
              <Input label="Organisation / Chamber / Firm" value={profileData.identity.organization} onChange={(val) => updateProfileData('identity', { organization: val })} />
              <SelectInput 
                label="Country" 
                value={profileData.identity.country} 
                onChange={(val) => updateProfileData('identity', { country: val, city: '' })} 
                options={allCountries}
                required
              />
              <SelectInput 
                label="City" 
                value={profileData.identity.city} 
                onChange={(val) => updateProfileData('identity', { city: val })} 
                options={cities}
                placeholder={profileData.identity.country ? "Search or type your city..." : "Please select a country first"}
                required
              />
            </div>
            <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
          </div>
        );

      case 'practice':
        if (selectedTrack === 'law_firm_excellence') {
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-xs font-light mb-4">Help us understand the nature of your firm's practice.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Primary Practice Areas" value={profileData.practice.primaryPracticeAreas} onChange={(val) => updateProfileData('practice', { primaryPracticeAreas: val })} required />
                <Input label="Secondary Practice Areas" value={profileData.practice.secondaryPracticeAreas} onChange={(val) => updateProfileData('practice', { secondaryPracticeAreas: val })} />
                <Input label="Office Locations" value={profileData.practice.officeLocations} onChange={(val) => updateProfileData('practice', { officeLocations: val })} required />
                <SelectInput 
                  label="Firm Size" 
                  value={profileData.practice.firmSize} 
                  onChange={(val) => updateProfileData('practice', { firmSize: val })} 
                  options={["1 member", "2 - 5 members", "6 - 10 members", "11 - 50 members", "51 - 150 members", "150+ members"]}
                  required
                />
                <Input label="Industries Served" value={profileData.practice.industriesServed} onChange={(val) => updateProfileData('practice', { industriesServed: val })} />
              </div>
              <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
            </div>
          );
        }

        if (selectedTrack === 'legal_innovation') {
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-xs font-light mb-4">Detail your organisation's innovation profile.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Primary Innovation Area" value={profileData.practice.primaryInnovationArea} onChange={(val) => updateProfileData('practice', { primaryInnovationArea: val })} required />
                <Input label="Product / Service Category" value={profileData.practice.productCategory} onChange={(val) => updateProfileData('practice', { productCategory: val })} required />
                <Input label="Practice Areas Served" value={profileData.practice.practiceAreasServed} onChange={(val) => updateProfileData('practice', { practiceAreasServed: val })} required />
                <Input label="Markets Served" value={profileData.practice.marketsServed} onChange={(val) => updateProfileData('practice', { marketsServed: val })} required />
                <SelectInput 
                  label="Organisation Size" 
                  value={profileData.practice.orgSize} 
                  onChange={(val) => updateProfileData('practice', { orgSize: val })} 
                  options={["1 member", "2 - 5 members", "6 - 10 members", "11 - 50 members", "51 - 150 members", "150+ members"]}
                  required
                />
                <Input label="Industry Focus" value={profileData.practice.industryFocus} onChange={(val) => updateProfileData('practice', { industryFocus: val })} />
              </div>
              <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <p className="text-white/40 text-xs font-light mb-4">Help us understand the nature of your professional practice.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Primary Practice Area" value={profileData.practice.primaryPracticeAreas} onChange={(val) => updateProfileData('practice', { primaryPracticeAreas: val })} required />
              <Input label="Secondary Practice Areas" value={profileData.practice.secondaryPracticeAreas} onChange={(val) => updateProfileData('practice', { secondaryPracticeAreas: val })} />
              <Input label="Years of Practice" value={profileData.practice.yearsOfPractice} onChange={(val) => updateProfileData('practice', { yearsOfPractice: val })} required />
            </div>
            <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
          </div>
        );

      case 'biography':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-xs font-light mb-4">Describe your professional journey, areas of expertise and significant contributions to the legal profession.</p>
            <TextArea 
              label="Biography" 
              value={profileData.biography.bio} 
              onChange={(val) => updateProfileData('biography', { bio: val })} 
            />
            <ContinueButton onClick={() => handleContinue('biography', 'presence')} />
          </div>
        );

      case 'presence':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-xs font-light mb-4">Provide links to your official professional presence.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Official Website" value={profileData.presence.website} onChange={(val) => updateProfileData('presence', { website: val })} />
              <Input label="LinkedIn" value={profileData.presence.linkedin} onChange={(val) => updateProfileData('presence', { linkedin: val })} />
              <Input label="Publications" value={profileData.presence.publications} onChange={(val) => updateProfileData('presence', { publications: val })} />
            </div>
            <ContinueButton onClick={() => handleContinue('presence', 'documents')} />
          </div>
        );

      case 'documents':
        if (selectedTrack === 'law_firm_excellence') {
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-xs font-light mb-4">Upload supporting documentation for your firm's submission.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload label="Firm Logo / Photograph" onUpload={() => updateProfileData('documents', { photoUploaded: true })} uploaded={profileData.documents.photoUploaded} required />
                <FileUpload label="Representative Work" onUpload={() => updateProfileData('documents', { workUploaded: true })} uploaded={profileData.documents.workUploaded} />
                <FileUpload label="Supporting Documents" onUpload={() => updateProfileData('documents', { suppUploaded: true })} uploaded={profileData.documents.suppUploaded} />
              </div>
              <ContinueButton onClick={() => handleContinue('documents', 'review')} text="Review Editorial Submission" />
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <p className="text-white/40 text-xs font-light mb-4">Upload supporting documentation for your submission.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload label="Professional Photograph" onUpload={() => updateProfileData('documents', { photoUploaded: true })} uploaded={profileData.documents.photoUploaded} required />
              <FileUpload label="Curriculum Vitae" onUpload={() => updateProfileData('documents', { cvUploaded: true })} uploaded={profileData.documents.cvUploaded} required />
              <FileUpload label="Representative Work" onUpload={() => updateProfileData('documents', { workUploaded: true })} uploaded={profileData.documents.workUploaded} />
              <FileUpload label="Supporting Documents" onUpload={() => updateProfileData('documents', { suppUploaded: true })} uploaded={profileData.documents.suppUploaded} />
            </div>
            <ContinueButton onClick={() => handleContinue('documents', 'review')} text="Review Editorial Submission" />
          </div>
        );

    }
  };

  return (
    <div className="min-h-screen pt-32 pb-8 px-6 lg:px-12 relative z-10 flex flex-col w-full max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-[1px] bg-gold-500/60" />
            <span className="text-gold-500 text-[0.6rem] font-semibold uppercase tracking-[0.3em]">
              Step 3 of 4
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wide font-light drop-shadow-md mb-2">
            Editorial Profile
          </h2>
          <p className="text-neutral-400 text-xs md:text-[0.8rem] font-light leading-relaxed max-w-xl">
            Complete your editorial submission profile across the sections below.
          </p>
        </div>
        
        <button
          onClick={() => setStage('programme_selection')}
          className="group inline-flex items-center text-neutral-500 hover:text-gold-400 transition-colors text-[0.65rem] uppercase tracking-widest font-semibold pb-1"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </div>

      <div className="flex flex-col w-full">
        {/* Main Content Area */}
        <div className="w-full">
          {/* Stepper / Progress Tabs */}
          <div className="flex space-x-2 mb-8">
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              const isCompleted = completedSections.includes(section.id as SectionKey);
              const isPast = sections.findIndex(s => s.id === activeSection) > idx;
              
              return (
                <div 
                  key={section.id} 
                  className={`flex-1 flex flex-col gap-2 ${isCompleted || isPast ? 'cursor-pointer group' : ''}`}
                  onClick={() => (isCompleted || isPast) && setActiveSection(section.id as SectionKey)}
                >
                  <div className="relative h-[3px] w-full rounded-full bg-white/5 overflow-hidden">
                    <div className={`absolute inset-0 h-full rounded-full transition-all duration-700 ease-out ${
                      isActive ? 'bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.6)]' : 
                      isCompleted || isPast ? 'bg-gold-500/40 group-hover:bg-gold-500/60' : 
                      'bg-transparent'
                    }`} />
                  </div>
                  <div className="flex flex-col pr-2">
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span className={`text-[0.5rem] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${
                        isActive ? 'text-gold-500' : 
                        isCompleted || isPast ? 'text-gold-500/60' : 
                        'text-white/20'
                      }`}>
                        {section.title}
                      </span>
                      {(isCompleted || isPast) && !isActive && (
                        <CheckCircle2 className="w-2.5 h-2.5 text-gold-500/50 group-hover:text-gold-500/80 transition-colors duration-300" />
                      )}
                    </div>
                    <span className={`text-[0.7rem] font-medium tracking-wide transition-colors duration-500 ${
                      isActive ? 'text-white drop-shadow-md' : 
                      isCompleted || isPast ? 'text-white/70 group-hover:text-white' : 
                      'text-white/30'
                    }`}>
                      {section.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Active Section Box */}
          <div className="bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/[0.06] rounded-xl shadow-sm p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 border-b border-white/5 pb-4">
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold-500/70 block mb-1.5">
                    {sections.find(s => s.id === activeSection)?.title}
                  </span>
                  <h3 className="text-xl font-serif text-white drop-shadow-sm">
                    {sections.find(s => s.id === activeSection)?.subtitle}
                  </h3>
                </div>
                {renderSectionContent(activeSection)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Label({ label, required }: { label: string, required?: boolean }) {
  return (
    <label className="text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-gold-500/70 mb-2 pl-1 drop-shadow-sm flex items-center">
      {label}
      {required ? (
        <span className="text-red-500/90 ml-1.5 text-sm leading-none">*</span>
      ) : (
        <span className="text-white/30 ml-2 tracking-[0.1em] font-medium">(OPTIONAL)</span>
      )}
    </label>
  );
}

function Input({ label, value, onChange, required }: { label: string, value: string, onChange: (val: string) => void, required?: boolean }) {
  return (
    <div className="flex flex-col">
      <Label label={label} required={required} />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-md px-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 shadow-inner"
      />
    </div>
  );
}

function SelectInput({ label, value, onChange, options, required, placeholder }: { label: string, value: string, onChange: (val: string) => void, options: string[], required?: boolean, placeholder?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const filteredOptions = (isTyping && value) 
    ? options.filter(opt => opt.toLowerCase().includes(value.toLowerCase())) 
    : options;

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsTyping(false);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col relative">
      <Label label={label} required={required} />
      <div className="relative">
        <input 
          type="text"
          autoComplete="new-password"
          name={`custom-select-${label.toLowerCase()}`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsTyping(true);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsTyping(false);
            setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 200);
          }}
          placeholder={placeholder || `Search or type ${label}...`}
          className="w-full bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-md px-3 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 shadow-inner"
        />

        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <ChevronRight className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[100%] left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 max-h-96 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
          >
            {filteredOptions.map((opt, idx) => (
              <div 
                key={idx}
                className="px-3 py-2.5 text-sm text-white/80 hover:bg-gold-500/20 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-none"
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextArea({ label, value, onChange, required }: { label: string, value: string, onChange: (val: string) => void, required?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setIsSaved(false);
    
    // Simulate auto-save
    setTimeout(() => {
      setIsSaved(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col">
      <Label label={label} required={required} />
      <div className="relative">
        <textarea 
          value={value}
          onChange={handleChange}
          rows={5}
          className="w-full bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-lg p-6 text-white text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 resize-none shadow-inner"
        />
        <div className="absolute bottom-4 left-6 flex items-center text-[0.65rem] text-white/30">
          {isSaved ? (
            <span className="flex items-center text-gold-500/70">
              <CheckCircle2 className="w-3 h-3 mr-1.5" /> Auto-saved just now
            </span>
          ) : value ? (
            <span className="flex items-center">
              <Edit2 className="w-3 h-3 mr-1.5 animate-pulse" /> Saving...
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-4 right-6 text-[0.65rem] text-white/30">
          {value.length} characters
        </div>
      </div>
    </div>
  );
}

function FileUpload({ label, onUpload, uploaded, required }: { label: string, onUpload: () => void, uploaded: boolean, required?: boolean }) {
  return (
    <div className="flex flex-col relative">
      <Label label={label} required={required} />
      <div 
        onClick={onUpload}
        className={`mt-1 border border-dashed rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          uploaded 
            ? 'border-gold-500/40 bg-gold-500/5 hover:bg-gold-500/10' 
            : 'border-white/10 bg-[#111]/40 hover:border-white/30 hover:bg-[#111]/80'
        }`}
      >
        {uploaded ? (
          <>
            <CheckCircle2 className="w-6 h-6 text-gold-400 mb-3" />
            <span className="text-white text-sm font-medium">Document uploaded</span>
            <span className="text-white/40 text-[0.65rem] mt-1">Click to replace</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-6 h-6 text-white/30 mb-3" />
            <span className="text-white/50 text-sm">Click to upload document</span>
          </>
        )}
      </div>
    </div>
  );
}
