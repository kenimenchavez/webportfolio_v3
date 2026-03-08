import { useState } from "react";
import ShimmerText from "../components/ShimmerText";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setOpen(true);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content }
      ]);

    } catch (err) {
      console.error(err);
    }

    setInput("");
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  function closeModal() {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250);
  }

  return (
    <>
      {/* Prompt Bar */}

      <div className="w-full max-w-xl mx-auto mt-12">

        <div
          className="
          chatbot-border
          flex items-center
          rounded-xl
          px-5 py-4
          border
          bg-dark
        "
        >

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to know?"
            className="
            chatbot
            flex-1
            bg-transparent
            outline-none
            text-base md:text-base
            placeholder-neutral-400
            dark:placeholder-neutral-500
          "
          />

          <button
            onClick={sendMessage}
            className="
            ml-3
            text-xs md:text-sm
            opacity-70
            hover:opacity-100
            dark:text-[#eee]
          "
          >
            →
          </button>

        </div>

      </div>

      {/* Modal Chat */}

      {open && (

        <div className={`chat-modal ${closing ? "closing" : ""}`}>

          <div className="chat-container">

            <button
              className="chat-close"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="chat-messages">

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.role === "user" ? "user-msg" : "ai-msg"}
                >
                  {msg.content}
                </div>
              ))}

              {loading && (
  <div className="ai-msg ai-loading">
    <ShimmerText>
      Please hold on, I'm thinking...
    </ShimmerText>
  </div>
)}

            </div>

            <div className="chat-input">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
              />

              <button onClick={sendMessage}>
                Send
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}