import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const FilterSidebar = ({ selectedCategories, onCategoryChange }: FilterSidebarProps) => {
  const categories = [
    "Aventura",
    "Ciencia-ficción",
    "Literatura",
    "Cómics",
    "Novelas",
  ];

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-foreground mb-4">Filtros de Búsqueda</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-3">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoryChange(category)}
              className="border-2"
            />
            <Label
              htmlFor={category}
              className="text-sm font-medium cursor-pointer text-foreground"
            >
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
