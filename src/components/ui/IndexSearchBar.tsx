import { Search } from "lucide-react";

interface IndexSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: () => void;
}

export function IndexSearchBar({ searchQuery, setSearchQuery, onSearch }: IndexSearchBarProps) {
  return (
    <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/[0.07] border-t-[#CBAA69]/20 rounded-[2px] flex flex-col md:flex-row items-stretch shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#CBAA69]/5 via-transparent to-[#CBAA69]/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative left accent */}
      <div className="hidden md:block w-1.5 self-stretch bg-gradient-to-b from-[#CBAA69] to-[#7a6030]" />

      {/* Main Search Input */}
      <div className="flex-1 flex items-center gap-4 px-6 md:px-8 py-5 md:py-7 relative z-10 w-full">
        <Search className="w-5 h-5 text-[#CBAA69]/80 flex-shrink-0" />
        <input 
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSearch()}
          placeholder="Search by name, city or Record ID..."
          className="w-full bg-transparent border-none text-[0.95rem] text-white placeholder:text-white/30 focus:outline-none tracking-wide font-light"
        />
      </div>

      {/* Search Button */}
      <div className="border-t md:border-t-0 md:border-l border-white/[0.05] relative z-10 flex w-full md:w-auto">
        <button 
          onClick={onSearch} 
          className="w-full md:w-auto px-10 py-5 bg-[#CBAA69]/10 hover:bg-[#CBAA69]/20 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap h-full flex items-center justify-center border-l-2 border-transparent hover:border-[#CBAA69]"
        >
          SEARCH INDEX
        </button>
      </div>
    </div>
  );
}
