import { useState } from "react";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import BookCard from "@/components/BookCard";
import AddMaterialDialog from "@/components/AddMaterialDialog";
import EditMaterialDialog from "@/components/EditMaterialDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { toast } from "sonner";
import { mockCatalogBooks } from "@/data/mockData";

const MaterialManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAddTitles = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditTitles = () => {
    if (selectedBookId !== null) {
      setIsEditDialogOpen(true);
    }
  };

  const handleBookSelect = (bookId: number) => {
    setSelectedBookId(selectedBookId === bookId ? null : bookId);
  };

  const handleSearch = () => {
    toast.info(`Buscando: ${searchQuery}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredBooks = mockCatalogBooks.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(book.category || "");

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AddMaterialDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      <EditMaterialDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />

      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Sidebar de filtros */}
          <aside className="w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </aside>

          {/* Contenido principal */}
          <div className="flex-1 space-y-6">
            {/* Barra de búsqueda y botones */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Los Juegos del Hambre"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 pr-10 py-6 rounded-xl bg-card"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <Button
                onClick={handleSearch}
                className="px-8 py-6 rounded-xl bg-card hover:bg-card/90 text-foreground border border-border"
                variant="outline"
              >
                Buscar
              </Button>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 justify-end">
              <Button
                onClick={handleAddTitles}
                className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Añadir títulos
              </Button>
              <Button
                onClick={handleEditTitles}
                disabled={selectedBookId === null}
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Editar títulos
              </Button>
            </div>

            {/* Lista de libros */}
            <div className="space-y-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  availability={book.availability || ""}
                  summary={book.summary || ""}
                  publisher={book.publisher || ""}
                  coverImage={book.coverImage}
                  isSelected={selectedBookId === book.id}
                  onClick={() => handleBookSelect(book.id!)}
                />
              ))}

              {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No se encontraron libros con los criterios seleccionados
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MaterialManagement;
