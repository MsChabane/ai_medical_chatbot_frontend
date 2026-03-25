"use client";

import { useEffect, useRef } from "react";
import AiMessage from "./AiMessage";
import AiThinking from "./AiThinking";
import GenralStep from "./Steps/GeneralStep";
import WebSearch from "./Steps/WebSearchStep";
import CheckSafety from "./Steps/SafetyCheckStep";
import UserMessage from "./UserMessage";

interface ChatBodyProp {
  messages: Message[];
  isLoading: boolean;
  historyLoading: boolean;
  steps: Step[];
  error: string;
}

const ChatBody = ({ messages, isLoading, historyLoading, steps, error }: ChatBodyProp) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, steps]);

  return (
    <div className="py-5 flex-1 overflow-y-auto min-h-0 hide-scrollbar px-20">
      <div className="flex flex-col gap-3  mx-auto ">
        {historyLoading && (
          <div className="w-full px-4 py-6 text-center rounded-lg bg-slate-800 border border-slate-700">
            <p className="text-sm text-sky-300 font-medium">Loading conversation history...</p>
          </div>
        )}

        {!historyLoading && error && (
          <div className="w-full px-4 py-4 text-center rounded-lg bg-rose-900 border border-rose-700">
            <p className="text-md text-rose-100 font-semibold">Error</p>
            <p className="mt-1 text-sm text-rose-200">{error}</p>
          </div>
        )}

        {!historyLoading && !error && messages.length === 0 && !isLoading && steps.length === 0 && (
          <div className="w-full px-4 py-10 text-center rounded-lg bg-slate-900 border border-slate-700">
            <p className="text-lg text-slate-300 font-semibold">No messages yet</p>
            <p className="mt-2 text-sm text-slate-400">
              Start by entering a thread ID and sending a question.
            </p>
          </div>
        )}

        {messages
          ?.slice(0, messages.length - 1)
          .map((message, idx) =>
            message.type === "human" ? (
              <UserMessage key={idx} message={message} />
            ) : (
              <AiMessage key={idx} message={message} />
            ),
          )}
        {messages.at(-1) && messages.at(-1)?.type === "human" && (
          <UserMessage message={messages.at(-1) as UserMessage} />
        )}
        {isLoading && <AiThinking />}

        <ul className=" text-white">
          {steps.map((step, idx) => {
            if (step.step === "safety check") {
              return (
                <CheckSafety
                  key={idx}
                  safety_status={step["safety status"] as string}
                />
              );
            }

            if (step.step === "patient lookup") {
              return (
                <GenralStep
                  key={idx}
                  title="Patient Look Up"
                  subtitle="looking for the patient in the system"
                  islast={false}
                />
              );
            }

            if (step.step === "web search") {
              return (
                <WebSearch
                  key={idx}
                  query={step.query as string}
                  urls={step.urls as string[]}
                />
              );
            }

            if (step.step === "helper tools") {
              return (
                <GenralStep
                  key={idx}
                  title="calling additional tools ..."
                  subtitle=""
                  islast={false}
                />
              );
            }

            if (step.step === "answer written") {
              return (
                <GenralStep
                  key={idx}
                  title="writing the answer ..."
                  islast={true}
                  subtitle=""
                />
              );
            }

            return null;
          })}
        </ul>
        {messages.at(-1) && messages.at(-1)?.type === "ai" && (
          <AiMessage message={messages.at(-1) as AiMessage} />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBody;
