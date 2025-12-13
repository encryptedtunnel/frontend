export default function MessageBubble({ message }) {
  const isMe = message.from === "me";

  return (
    <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
      <div className="flex flex-col max-w-[80%]">
        <p
          className={`px-4 py-3 text-base rounded-xl ${
            isMe
              ? "bg-primary text-white rounded-br-sm self-end"
              : "bg-[#233648] text-white rounded-bl-sm"
          }`}
        >
          {message.text}
        </p>

        <span className="text-xs text-gray-500 mt-1 self-end">
          {message.time}
        </span>
      </div>
    </div>
  );
}