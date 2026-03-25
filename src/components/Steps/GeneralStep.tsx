const GenralStep = ({
  title,
  subtitle,
  islast,
}: {
  title: string;
  subtitle: string;
  islast: boolean;
}) => {
  return (
    <li className="relative flex gap-1 ">
      <div
        className={`${islast ? "before:hidden" : "before:content-['']"}  before:w-0.5 before:absolute before:h-full before:top-1 before:left-[4px] before:bg-blue-500`}>
        <div className="size-3 rounded-full bg-blue-500"></div>
      </div>
      <div className="py-2">
        <h1 className="text-sm font-medium mb-1">{title}</h1>
        {subtitle && <p className="text-xs font-mono">{subtitle}</p>}
      </div>
    </li>
  );
};
export default GenralStep;
