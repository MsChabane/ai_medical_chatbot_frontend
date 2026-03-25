import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { MAX_RECORDING_SECONDS, API_BASE_URL } from "@/lib/constant";

type useChatStreamTypes = {
  steps: Step[];
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  historyLoading: boolean;
  messages: Message[];
  setRefrech: (v: boolean) => void;
  sendMessage: () => void;
  setThread_id: (v: string) => void;
  thread_id: string;
  isTranscribing: boolean;
  blob: Blob | null;
  recordingTime: number;
  error: string;
  isRecording: boolean;
  formatTime: (m: number) => string;
  toggleRecording: () => void;
};

export function useChatStream(): useChatStreamTypes {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [thread_id, setThread_id] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [refrech, setRefrech] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetch_messages = async () => {
    try {
      // Abort any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      setHistoryLoading(true);
      console.log("fetching history");
      const response = await axios.get(
        `${API_BASE_URL}/history?thread_id=${encodeURI(thread_id)}`,
        {
          timeout: 10000, // 10 seconds
          signal: abortControllerRef.current.signal,
        },
      );
      console.log("fetching data");
      console.log(response.data);
      setError("")
      setMessages(response.data.messages);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Fetch messages request cancelled');
        return;
      }
      if (axios.isAxiosError(err) && err.code === 'ECONNABORTED') {
        console.error('History request timed out after 10 seconds');
        setError("History request timed out after 10 seconds")
      } else {
        console.error("Error fetching messages:", err);
        setError("Error fetching messages")
      }
      setMessages([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && thread_id) {
      setSteps([]);
      setMessages([])
      const timeoutId = setTimeout(() => {
        fetch_messages();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [refrech, thread_id]);

  

  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= MAX_RECORDING_SECONDS) {
            stopRecording();
            return MAX_RECORDING_SECONDS;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      setRecordingTime(0);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      console.log("start Rec")
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setBlob(null)
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("data getting")
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log("end Rec")
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        console.log("set the blob")
        setBlob(audioBlob);

        // Transcribe the audio
        await transcribeAudio(audioBlob);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError("");
    } catch (err) {
      console.error("Erreur d'accès au microphone:", err);
      setError("Impossible d'accéder au microphone. Vérifiez les permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const transcribeAudio = useCallback(async (audioBlob: Blob) => {
    try {
      // Abort any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      setIsTranscribing(true);
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');

      const response = await axios.post(
        `${API_BASE_URL}/transcribe`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          signal: abortControllerRef.current.signal,
        }
      );

      if (response.data.success) {
        const transcribedText = response.data.transcription;
        setInput(transcribedText);
      } else {
        console.error('Transcription failed:', response.data.error);
        setError('Transcription failed: ' + response.data.error);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Transcribe request cancelled');
        return;
      }
      console.error('Error transcribing audio:', err);
      setError('Failed to transcribe audio');
    } finally {
      setIsTranscribing(false);
    }
  }, []);

  const sendMessage = useCallback(async () => {
    if (!thread_id){
      setError("Provide the Thread id to continue ...")
      return ;
    }
    if (!input.trim()) return "";
    const user_input = input.trim();
    setInput("");
    setSteps([]);
    
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    const humanMsg: UserMessage = blob ?{ 
          type: "human",
          content: input.trim(),
          audio: blob,
        }: {
      type: "human",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, humanMsg]);

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/chat/stream`,
        {
          user_input: user_input,
          thread_id: thread_id,
        },
        {
          responseType: "text",
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortControllerRef.current.signal,
        },
      );
      console.log("getting responce")
      const text = response.data;
      const lines = text.split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;

        try {
          const parsed: Step = JSON.parse(line);
          if (parsed.error){
            setError(parsed.error)
          }

          setSteps((prev) => [...prev, parsed]);
          if (parsed.step === "answer written") {
            const aiMsg: AiMessage = {
              type: "ai",
              content: parsed.answer as string,
            };
            setMessages((prev) => [...prev, aiMsg]);
          }
        } catch (err) {
          console.error("Parse error", err);
        }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Send message request cancelled');
        return;
      }
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  }, [thread_id, input, blob]);

  useEffect(() => {
  return () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };
}, []);

  return {
    steps,
    input,
    setInput,
    loading,
    historyLoading,
    messages,
    setRefrech,
    sendMessage,
    setThread_id,
    thread_id,
    isRecording,
    isTranscribing,
    recordingTime,
    formatTime,
    blob,
    error,
    toggleRecording,
  };
}



