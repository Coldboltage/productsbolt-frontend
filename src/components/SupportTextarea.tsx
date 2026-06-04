import React from "react";

export const SupportTextarea = ({
  text,
  value,
  onChange,
}: {
  text: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="text-lg">{text}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          py-3
          h-48
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-800/40
          px-4
          text-white
          placeholder:text-slate-400
          focus:border-indigo-500
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
        "
      />{" "}
    </div>
  );
};

export default SupportTextarea;
