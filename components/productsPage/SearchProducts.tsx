"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchProductsProps {
  placeholder: string;
  className?: string;
}

const inputBaseClass = `w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-1
  focus:ring-gray-400 focus:border-gray-400 transition-colors [&:-webkit-autofill]:[-webkit-text-fill-color:white] 
  [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset] [&:-webkit-autofill:hover]:[-webkit-text-fill-color:white] 
  [&:-webkit-autofill:hover]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset] [&:-webkit-autofill:focus]:[-webkit-text-fill-color:white] 
  [&:-webkit-autofill:focus]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset]`;

const SearchProducts = ({ className, placeholder }: SearchProductsProps) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");

    console.log("params", params.toString());

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={cn("relative w-full lg:w-1/2", className)}>
      <input
        type="text"
        placeholder={placeholder}
        className={inputBaseClass}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Search className="size-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export { SearchProducts };
