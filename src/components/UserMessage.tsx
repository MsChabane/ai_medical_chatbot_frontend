"use client";

import { Play, Pause } from "lucide-react";
import { useRef, useState } from "react";

const UserMessageComponent: React.FC<{ message: UserMessage }> = ({
  message,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-start justify-end gap-3">
      <div className="flex flex-col gap-2 max-w-md">
        {/* Audio Display */}
        {message.audio && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors flex-shrink-0"
            >
              {isPlaying ? (
                <Pause size={16} color="white" />
              ) : (
                <Play size={16} color="white" />
              )}
            </button>
            <div className="flex-1">
              <div className="text-xs text-blue-300 font-medium">Audio Message</div>
            </div>
            <audio
              ref={audioRef}
              src={URL.createObjectURL(message.audio)}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}

        {/* Text Display */}
        {message.content && (
          <div className="bg-neutral-700 rounded-lg p-3">
            <p className="text-sm text-white font-medium tracking-wide">
              {message.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMessageComponent;
