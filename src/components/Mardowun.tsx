import { Components } from "react-markdown";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-xl font-bold mt-4 mb-2 text-white">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold mt-3 mb-1 text-white">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold mt-2 mb-1 text-white">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-white leading-relaxed mb-2">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 my-2 space-y-1 text-white text-sm">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 my-2 space-y-1 text-white text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-white/80">{children}</em>,
  code: ({ children }) => (
    <code className="bg-black/40 text-green-300 font-mono text-xs px-1.5 py-0.5 rounded">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-black/40 border border-white/10 rounded-md p-3 my-2 overflow-x-auto text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-white/30 pl-3 my-2 text-white/60 italic text-sm">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-white/20 my-3" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="underline text-blue-300 hover:text-blue-200 transition-colors">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-3 ">
      <table className="text-sm text-white border-collapse w-full">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-white/20 bg-white/10 px-3 py-1.5 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-white/20 px-3 py-1.5">{children}</td>
  ),
  br: ({ children }) => (
    <>
      <br />
      {children}
    </>
  ),
};

export default markdownComponents;
