import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import markdownComponents from "./Mardowun";

const AiMessage: React.FC<{ message: AiMessage }> = ({ message }) => (
  <div className="flex flex-col gap-2 px-4 bg-neutral-900 rounded-lg py-2 ">
    <div className="prose prose-invert text-white">
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {message.content}
      </Markdown>
    </div>
  </div>
);
export default AiMessage;
