export default function ChatListItem({ chat, onClick, isActive = false }) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-4 rounded-xl py-3 px-2 hover:bg-white/5 ${isActive ? "bg-white/5" : ""
        }`}
    >
      <div className="flex-grow overflow-hidden">
        <div className="flex items-baseline justify-between">
          <p className="truncate text-base font-semibold text-white">{chat.participant_display_name}</p>
          <p className="text-xs text-primary">{chat.last_message_time}</p>
        </div>

        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm text-gray-400">{chat.last_message}</p>

          {/* {chat.unread  && (
            <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white px-1">
              {2}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}