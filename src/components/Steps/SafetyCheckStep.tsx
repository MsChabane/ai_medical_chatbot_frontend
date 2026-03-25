import { CheckCircle, X } from "lucide-react";

const CheckSafety = ({ safety_status }: { safety_status: string }) => {
  return (
    <li className="relative flex gap-1  ">
      <div className="before:content-[''] before:w-0.5 before:absolute before:h-full before:top-1 before:left-[4px] before:bg-blue-500">
        <div className="size-3 rounded-full bg-blue-500"></div>
      </div>
      <div className="py-2">
        <h1 className="text-sm font-medium mb-1">checking for safety ...</h1>
        <p className="text-xs font-mono flex items-center gap-1">
          {safety_status === "safe" ? (
            <CheckCircle className="text-green-900" width={12} />
          ) : (
            <X className="text-red-500 " width={12} />
          )}
          {safety_status}
        </p>
      </div>
    </li>
  );
};

export default CheckSafety;
