import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI assistant 💡" },
  ]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSend() {
    try {
      const user = getAuth().currentUser;

      if (!user) {
        toast.error("User not logged in");
        return;
      }

      const firebaseToken = await user.getIdToken();

      // Dummy notification test (disabled now)
      // await axios.post("http://127.0.0.1:5000/api/v1/notifications/create", {
      //   firebaseToken,
      //   message: "BTCUSDT BUY signal generated",
      //   decision: "BUY",
      //   entry_price: 67000,
      //   take_profit: 69000,
      //   stop_loss: 65000,
      // });

      // toast.success("Notification created successfully 🚀");

      if (!input) return;

      const inputMessage = { role: "user", content: input };

      setMessages((messages) => [...messages, inputMessage]);
      setInput("");

      const response = await axios.post(
        "http://localhost:8000/chat",
        [inputMessage],
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const newMessages = response.data.messages;

      console.log("Response:", newMessages);

      // add chatbot messages
      setMessages((messages) => [...messages, ...newMessages]);

      // find judge agent message
      const judgeMessage = newMessages.find(
        (msg) => msg.agent === "judge_agent",
      );

      // create notification if BUY or SELL
      if (
        judgeMessage &&
        (judgeMessage.decision === "BUY" || judgeMessage.decision === "SELL")
      ) {
        await axios.post("http://127.0.0.1:5000/api/v1/notifications/create", {
          firebaseToken,
          message: judgeMessage.content,
          decision: judgeMessage.decision,
          entry_price: judgeMessage.entry_price,
          take_profit: judgeMessage.take_profit,
          stop_loss: judgeMessage.stop_loss,
        });

        toast.success(`AI Signal: ${judgeMessage.decision} 🚨`);
      }
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data : error.message,
      );

      toast.error("Failed to process request ❌");
    }

    // if (!input) return;

    // const inputMessage = { role: "user", content: input };

    // setMessages((messages) => [...messages, inputMessage]);
    // setInput("");

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/chat",
    //     [inputMessage],
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     },
    //   );

    //   const newMessages = response.data.messages;

    //   console.log("Response:", newMessages);

    //   // add chatbot messages
    //   setMessages((messages) => [...messages, ...newMessages]);

    //   // find judge agent message
    //   const judgeMessage = newMessages.find(
    //     (msg) => msg.agent === "judge_agent",
    //   );

    //   // create notification if BUY or SELL
    //   if (
    //     judgeMessage &&
    //     (judgeMessage.decision === "BUY" || judgeMessage.decision === "SELL")
    //   ) {
    //     await axios.post("http://127.0.0.1:5000/api/v1/notifications/create", {
    //       message: judgeMessage.content,
    //       decision: judgeMessage.decision,
    //       entry_price: judgeMessage.entry_price,
    //       take_profit: judgeMessage.take_profit,
    //       stop_loss: judgeMessage.stop_loss,
    //     });
    //   }
    // } catch (error) {
    //   console.error(
    //     "Error occurred:",
    //     error.response ? error.response.data : error.message,
    //   );
    // }
  }
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-30 right-6 z-50 w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg hover:bg-yellow-700 transition"
      >
        <MessageCircle size={30} />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[600px] bg-gray-900 z-40 shadow-xl transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="font-bold text-lg text-white flex items-center gap-2">
            <MessageCircle size={20} />
            AI Assistant
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[75%]  text-xl ${
                msg.role === "assistant"
                  ? "bg-gray-700 text-white self-start"
                  : "bg-yellow-400 text-black self-end"
              }`}
            >
              {msg.content}
            </div>
          ))}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input */}
        <div className="h-20 p-4 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask something..."
            className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
          />

          <button
            onClick={handleSend}
            className="bg-yellow-400 hover:bg-black-700 px-4 rounded-lg text-black"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
