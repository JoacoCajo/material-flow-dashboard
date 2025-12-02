import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  hint?: string;
}

const SearchInput = ({
  label,
  value,
  onChange,
  onSearch,
  placeholder = "",
  hint,
}: SearchInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-amber-100 border-none"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <Button
          onClick={onSearch}
          size="icon"
          className="bg-amber-100 hover:bg-amber-200 text-foreground"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
};

export default SearchInput;
