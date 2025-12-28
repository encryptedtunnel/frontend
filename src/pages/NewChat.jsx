export default function NewChat({ onBack }) {
  return (
    <div className="flex flex-col h-full w-full bg-bg-dark text-white overflow-x-hidden">

      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        <button
          className="md:hidden text-primary flex items-center"
          onClick={onBack}
        >
          <span className="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        </button>

        <h1 className="text-lg font-bold">New Message</h1>

        <button className="text-primary font-semibold">
          Next
        </button>
      </header>

      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-gray-400">To:</span>
          <input
            className="
              flex-1
              bg-transparent
              outline-none
              text-white
              placeholder-gray-500
            "
            placeholder="Enter name, phone, or ID"
          />
        </div>
      </div>

      <div className="flex-1" />

      <footer className="p-3 border-t border-white/10 flex items-center gap-2 shrink-0">
        <input
          className="
            flex-1
            rounded-full
            px-4 py-2
            bg-white/10
            text-white
            outline-none
            focus:ring-2 focus:ring-primary
          "
          placeholder="Type a message..."
        />

        <button
          className="
            w-12 h-12
            rounded-full
            bg-primary
            flex items-center justify-center
          "
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </footer>
    </div>
  );
}