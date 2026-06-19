"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, ShieldCheck } from "lucide-react";

export function AnalystConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "analyst",
      content: "Welcome to Juris Standard. How may I assist you with your institutional research today?"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    setMessage("");
    
    // Simulate typing response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "analyst", 
        content: "An Intelligence Analyst will review your request. Please note, bespoke data cuts require verified credentials." 
      }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[60px] right-8 z-[80] w-14 h-14 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-gold-500/30 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="w-6 h-6 text-gold-400" />
        
        {/* Subtle dot indicator */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050505]" />
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[60px] right-8 z-[100] w-80 sm:w-96 h-[500px] flex flex-col rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/[0.1] shadow-[0_30px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#151515] border border-gold-500/20 flex items-center justify-center shadow-inner relative">
                  <ShieldCheck className="w-5 h-5 text-gold-400" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-white/90 tracking-wide">Private Concierge</h3>
                  <p className="text-[0.65rem] text-gold-500/70 font-medium uppercase tracking-widest">Intelligence Analyst</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {chatHistory.map((chat, idx) => (
                <div key={idx} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    chat.role === "user" 
                      ? "bg-gold-500/10 text-white/90 border border-gold-500/20 rounded-br-sm" 
                      : "bg-[#151515] text-white/70 border border-white/[0.05] rounded-bl-sm"
                  }`}>
                    {chat.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/[0.05] bg-[#050505]">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Request data or access..."
                  className="w-full bg-[#151515] border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center hover:bg-gold-400 transition-colors disabled:opacity-50"
                  disabled={!message.trim()}
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
              <p className="text-center mt-3 text-[0.55rem] text-white/30 uppercase tracking-widest">
                End-to-End Encrypted Channel
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
