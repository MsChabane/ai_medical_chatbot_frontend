"use client";
import { Mic, Send, StopCircleIcon, Play, Pause } from "lucide-react";
import { useRef, useState } from "react";
import { MAX_RECORDING_SECONDS } from "@/lib/constant";

interface ChatInputProps {
  setInputValue: (v: string) => void;
  inputValue: string;
  handleSend: () => void;
  isLoading: boolean;
  isRecording: boolean;
  isTranscribing: boolean;
  recordingTime: number;
  formatTime: (m: number) => string;
  toggleRecording: () => void;
}

const ChatInput = ({
  setInputValue,
  handleSend,
  isLoading,
  inputValue,
  isRecording,
  isTranscribing,
  recordingTime,
  formatTime,
  toggleRecording,

}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = textareaRef.current;
    if (!el) return;

    setInputValue(e.target.value);

    // reset height
    el.style.height = "auto";

    el.style.height = el.scrollHeight + "px";
  };

 

  return (
    <div className="py-2 px-5">
      
      

      {/* Transcribing Indicator */}
      {isTranscribing && (
        <div className="mb-3 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-400 font-medium">Transcribing audio...</span>
          </div>
        </div>
      )}

      {/* Input Area */}
      
      <div className="flex items-center mx-auto gap-2.5 bg-transparent border rounded-lg p-2 transition-all duration-200 max-w-250 ">
           {isRecording ? (
        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex-1">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium">Recording...</span>
            <span className="text-white font-mono">{formatTime(recordingTime)}/{formatTime(MAX_RECORDING_SECONDS)}</span>
          </div>
        </div>
      ):
     <textarea
          rows={1}
          ref={textareaRef}
          onChange={handleChange}
          value={inputValue}
          placeholder="Ask about your medications..."
          className="flex-1 bg-transparent border-none outline-none text-white font-medium text-sm tracking-wider overflow-y-auto resize-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          disabled={isRecording}
        />
    
    }
       
        <button
          onClick={toggleRecording}
          className={`w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer transition-all ${
            isRecording
              ? "bg-red-600 hover:bg-red-700 border-red-500"
              : "hover:bg-white/5 bg-[rgba(239,68,68,0.15)] border-transparent"
          }`}
        >
          <Mic size={18} color="white" />
        </button>
        {
          !isRecording &&
           <button
          onClick={handleSend}
          disabled={isRecording}
          className="w-9 h-9 rounded-lg cursor-pointer shadow transition-all border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isLoading ? (
            <Send size={18} color="white" />
          ) : (
            <StopCircleIcon size={18} color="white" />
          )}
        </button>
        }
       
      </div>
      <p className="text-center text-xs font-bold text-gray-300 mt-2 mb-1">This Ai can make mistakes .</p>
    </div>
  );
};

export default ChatInput;
