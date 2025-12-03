import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const FilterSidebar = ({ selectedCategories, onCategoryChange }: FilterSidebarProps) => {
  const categories = [
    { value: "literatura_chilena", label: "Literatura chilena" },
    { value: "tecnico_español", label: "Técnico español" },
    { value: "novela", label: "Novela" },
    { value: "ciencia_ficcion", label: "Ciencia ficción" },
    { value: "historia", label: "Historia" },
    { value: "infantil", label: "Infantil" },
    { value: "accion", label: "Acción" },
    { value: "guerra", label: "Guerra" },
    { value: "romance", label: "Romance" },
  ];

  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-foreground mb-3">Filtros de búsqueda</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Selecciona una o más categorías para acotar los resultados.
      </p>
      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category.value}
            className="flex items-center gap-3 cursor-pointer hover:bg-muted/40 rounded-lg px-2 py-1.5 transition-colors"
          >
            <Checkbox
              id={category.value}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={() => onCategoryChange(category.value)}
              className="border-2 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <div className="flex-1">
              <Label
                htmlFor={category.value}
                className="text-sm font-medium text-foreground leading-tight"
              >
                {category.label}
              </Label>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
