import { Link } from "lucide-react";

const WebSearch = ({ urls, query }: { urls: string[]; query: string }) => {
  return (
    <li className="relative flex gap-1  ">
      <div className=" before:content-[''] before:w-0.5 before:absolute before:h-full before:top-1 before:left-[4px] before:bg-blue-500">
        <div className="size-3 rounded-full bg-blue-500"></div>
      </div>
      <div className="py-2 ">
        <h1 className="text-sm font-medium mb-1">searching in the web ...</h1>
        <p className="text-xs mb-0.5">
          query : <span className="text-xs font-medium  ">{query}</span>
        </p>

        <p className="text-xs mr-3  ">urls : </p>
        <ul className="flex gap-2 flex-wrap mt-0.5 ">
          {urls.map((url, idx) => (
            <li key={idx} className="flex gap-1 items-center group">
              <Link size={12} className="text-blue-500 texts-xs" />
              <a
                target="_top"
                href={url}
                className="underline text-blue-500  text-xs">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
export default WebSearch;
