// import { useState } from "react";

// export default function AIWidget() {
//     const [open, setOpen] = useState(false);
//     return (
//         <>
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
//             >
//                 AI
//             </button>
//             <div
//                 className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
//                     }`} >
//                 <div className="p-4 flex justify-between items-center border-b">
//                     <h2 className="font-bold text-lg">AI Assistant</h2>
//                     <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
//                         ✕
//                     </button>
//                 </div>
//                 <div className="p-4">
//                     <p>Hello! AI ready to assist you 💡</p>
//                 </div>
//             </div>
//         </>
//     );
// }
import { useState, useRef, useEffect } from "react";

export default function AIWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "ai", text: "Hello! I'm your AI assistant 💡" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    // Scroll to bottom on new message
    useEffect(() => {
        if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages([...messages, { from: "user", text: input }]);
        setInput("");

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { from: "ai", text: `You said: "${input}"` },
            ]);
        }, 700);
    };

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
            >
                💬
            </button>

            {/* Chat panel */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-gray-900 z-50 shadow-xl z-40 transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="font-bold text-lg text-white">AI Assistant</h2>
                    <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-xl">
                        ✕
                    </button>
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-2 rounded-lg max-w-[75%] ${msg.from === "ai" ? "bg-gray-700 text-white self-start" : "bg-blue-600 text-white self-end"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={chatEndRef}></div>
                </div>

                {/* Input area */}
                <div className="p-4 border-t border-gray-700 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}