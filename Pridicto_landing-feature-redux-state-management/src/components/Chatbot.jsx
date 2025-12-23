import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, X, MessageCircle } from "lucide-react";

// Save & Load Chat History
const loadHistory = () => JSON.parse(localStorage.getItem("chatHistory") || "[]");
const saveHistory = (data) => localStorage.setItem("chatHistory", JSON.stringify(data));

export default function LuxuryChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(loadHistory());
  const [botTyping, setBotTyping] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    saveHistory(messages);
  }, [messages]);

  // Simulated bot reply
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((p) => [...p, userMsg]);
    setInput("");

    setBotTyping(true);

    setTimeout(() => {
      const botMsg = {
        from: "bot",
        text: "Thanks for your message! How can I help you more?",
      };
      setMessages((p) => [...p, botMsg]);
      setBotTyping(false);
    }, 900);
  };

  // Quick Replies
  const quickReplies = [
    "What services do you offer?",
    "Give me pricing",
    "Show me portfolio",
    "Talk to support",
  ];

  // Voice Input (Optional)
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border
                     border-gray-200 backdrop-blur-xl overflow-hidden animate-slideUp"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h3 className="font-semibold">Predicto.ai Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  msg.from === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {botTyping && (
              <div className="bg-gray-200 text-gray-700 w-16 px-3 py-2 rounded-lg text-sm flex items-center gap-1">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Quick Replies */}
          <div className="p-3 flex flex-wrap gap-2 border-t bg-white">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  handleSend(q);
                }}
                className="px-3 py-1 text-xs bg-gray-200 rounded-full hover:bg-gray-300 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="p-3 bg-white border-t flex items-center gap-2">
            <button
              onClick={startVoice}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Mic size={20} className="text-gray-600" />
            </button>

            <input
              className="flex-1 px-3 py-2 text-sm border rounded-full outline-none"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-indigo-600"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
        .animate-slideUp {
          animation: slideUp 0.35s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background: #555;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }
        `}
      </style>
    </>
  );
}