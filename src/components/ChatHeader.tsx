"use client";
import { Input } from "./ui/input";

export default function ChatHeader({
  setThreadId,
  thread_id,
}: {
  thread_id: string;
  setThreadId: (v: string) => void;
}) {
  return (
    <header className="px-4 py-4  flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className=" border-white border-4 rounded-full w-7 h-7 "></div>
        <h1 className="text-2xl font-bold text-white ">MyPresciprion</h1>
      </div>
      <div className="flex gap-1 px-2">
        <Input
          type="text"
          placeholder="Enter the conversation id "
          className="text-white placeholder:text-gray-200"
          value={thread_id}
          onChange={(e) => setThreadId(e.target.value)}
        />
      </div>
    </header>
  );
}
