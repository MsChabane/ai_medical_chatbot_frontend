type Step = {
  step: string;
  "safety status"?: string;
  query?: string;
  urls?: string[];
  answer?: string;
  error?:string;
};

interface AiMessage {
  type: "ai";
  content: string;
}

interface UserMessage {
  type: "human";
  content: string;
  audio?: Blob;
}

type Message = AiMessage | UserMessage;

