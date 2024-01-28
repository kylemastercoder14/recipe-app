"use client";

import { fetchSearchedMeal } from "@/lib/api";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SearchBarProps {
  background: string;
  border: string;
  color: string;
}

const SearchBar = ({
  background,
  border,
  color
}: SearchBarProps) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && searchKeyword.trim() !== "") {
      router.push(`/search/${encodeURIComponent(searchKeyword)}`);
    }
  };

  return (
    <div className={`flex items-center gap-3 w-full z-50 ${border} ${background} px-3 py-2 rounded-md`}>
      <Search className={color} />
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search recipe..."
        className={`w-full border-0 outline-none ${color} ${background}`}
      />
    </div>
  );
};

export default SearchBar;
