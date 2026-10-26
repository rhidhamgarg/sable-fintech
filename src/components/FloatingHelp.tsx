import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export const FloatingHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 How can we help you get started with Sable today?' },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: message }]);
    setMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thanks for reaching out! You can open an account in 5 minutes with just your passport or SSN.',
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Help Popup Chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-32px)] max-w-sm sm:w-96 rounded-3xl liquid-glass-elevated p-4 flex flex-col h-96 animate-in fade-in slide-in-from-bottom-4 duration-200 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1FC6BB]" />
              <span className="font-semibold text-sm text-white">Sable Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#6FDBD4] text-black font-medium'
                      : 'bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-white/10">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#6FDBD4]"
            />
            <button
              type="submit"
              className="liquid-glass-btn-primary text-black p-2 rounded-xl transition-colors cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button: Liquid Glass Button (NO blurry neon glow!) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full liquid-glass-btn-primary flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-108 active:scale-95 cursor-pointer text-black"
        aria-label="Open chat support"
      >
        {isOpen ? <X size={20} className="sm:w-[22px] sm:h-[22px]" /> : <MessageSquare size={20} className="sm:w-[22px] sm:h-[22px]" />}
      </button>
    </div>
  );
};
