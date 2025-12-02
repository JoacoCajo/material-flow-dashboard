import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchBar = ({ 
  placeholder = "Nombre de usuario",
  onSearch 
}: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  const handleSearch = () => {
    onSearch?.(value);
  };

  return (
    <div className="flex gap-2 items-center max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button onClick={handleSearch}>
        Buscar
      </Button>
    </div>
  );
};
