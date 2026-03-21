"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
  time: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! Welcome to Property Pointers. I'm your real estate assistant. How can I help you today?\n\nYou can ask me about:\n• Buying or renting properties\n• Property prices & trends\n• Home loan information\n• Area guides & localities",
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");

    const time = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", content: userMsg, time }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      const botTime = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [...prev, { role: "bot", content: data.response, time: botTime }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I encountered an error. Please try again.", time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }
    setLoading(false);
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold-500 hover:bg-gold-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          <span className="absolute bottom-full right-0 mb-2 bg-navy-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with us!
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="gradient-navy px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gold-500 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Property Pointers Bot</p>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
                <Minimize2 size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={14} className="text-gold-400" />
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.role === "user" ? "bg-gold-500 text-white" : "bg-white text-gray-700 border border-gray-100"} px-3 py-2 rounded-xl text-sm shadow-sm`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-white/70" : "text-gray-400"}`}>{msg.time}</p>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center shrink-0 mt-1">
                    <User size={14} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-gold-400" />
                </div>
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-xl shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-3 py-2.5 bg-gold-500 hover:bg-gold-600 disabled:bg-gray-300 text-white rounded-xl transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide">
              {["Looking to buy", "Rent in Noida", "Property prices", "Home loan EMI"].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="shrink-0 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
