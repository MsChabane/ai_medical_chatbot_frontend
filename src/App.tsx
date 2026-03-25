


"use client";

import { useChatStream } from "./hooks/useChat";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { useState } from "react";

function App() {
  const {
    messages,
    input,
    setInput,
    loading,
    historyLoading,
    steps,
    sendMessage,
    thread_id,
    setThread_id,
    isRecording,
    isTranscribing,
    recordingTime,
    formatTime,
    toggleRecording,
    blob,
    error,
  } = useChatStream();

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside className="w-64 bg-primary border-r border-slate-800 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex gap-2 items-center ">
            <div className="size-6 rounded-full border-4  border-white" />
            <p className="text-3xl font-bold text-white uppercase">Medi</p>

          </div>
          <p className="text-xs text-white mt-1">AI Medical Assistant</p>
        </div>

        {/* Thread ID Input Section */}
        <div className="p-6 flex-1">
          <label className="block text-sm font-semibold text-white mb-3">
            Thread ID
          </label>
          <input
            type="text"
            value={thread_id}
            onChange={(e) => setThread_id(e.target.value)}
            placeholder="Enter thread ID..."
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <p className="text-xs text-gray-50 mt-2">
            Use the same thread ID to continue a conversation
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">
            © 2026 Myprescription
          </p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-slate-950">
        {/* Chat Header */}
        <div className="border-b border-slate-800 bg-slate-900/50 px-8 py-4">
          <h1 className="text-xl font-semibold text-white">Chat Assistant</h1>
          <p className="text-sm text-slate-400 mt-1">
            {thread_id ? `Thread: ${thread_id}` : "Start a new conversation"}
          </p>
        </div>

        {/* Chat Body - Messages */}
        <ChatBody
          messages={messages}
          isLoading={loading}
          historyLoading={historyLoading}
          steps={steps}
          error={error}
        />

        <div className="border-t border-slate-800 bg-slate-900/50">
          <ChatInput
            inputValue={input}
            setInputValue={setInput}
            handleSend={sendMessage}
            isLoading={loading}
            isRecording={isRecording}
            isTranscribing={isTranscribing}
            recordingTime={recordingTime}
            formatTime={formatTime}
            toggleRecording={toggleRecording}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
