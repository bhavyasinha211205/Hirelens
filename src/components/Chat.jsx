import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chat = ({
  isChatOpen,
  setIsChatOpen,
}) => {
  

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm HireLens AI. How can I help you today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentInput
      }
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: currentInput
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.reply
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Unable to connect to HireLens AI."
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {isChatOpen && (
        <div className="w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 mb-4 flex flex-col">

          {/* Header */}
          <div className="bg-[#a1006b] text-white p-4 flex items-center justify-between">
            <h3 className="font-bold">HireLens AI</h3>

            <button
              className="text-xl"
              onClick={() => setIsChatOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-slate-50 p-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap break-words
                  ${
                    msg.role === "user"
                      ? "bg-[#8f0264] text-white ml-auto"
                      : "bg-pink-100 text-black"
                  }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="bg-pink-100 text-black p-3 rounded-2xl max-w-[85%]">
                Typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">

            <input
              type="text"
              value={input}
              placeholder="Ask HireLens AI..."
              className="flex-1 border rounded-xl px-3 py-2 outline-none focus:border-[#c15292]"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-[#a1006b] hover:bg-[#a1006b] text-white px-4 rounded-xl"
            >
              Send
            </button>

          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="w-16 h-16 rounded-full bg-[#a1006b] text-white shadow-xl flex items-center justify-center text-2xl"
      >
        💬
      </button>

    </div>
  );
};

export default Chat;