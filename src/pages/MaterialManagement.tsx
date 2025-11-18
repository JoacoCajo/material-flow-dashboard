import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { toast } from "sonner";

const MaterialManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAddTitles = () => {
    toast.success("Función: Añadir títulos");
  };

  const handleEditTitles = () => {
    toast.info("Función: Editar títulos");
  };

  const handleSearch = () => {
    toast.info(`Buscando: ${searchQuery}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const books = [
    {
      id: 1,
      title: "Los Juegos del Hambre",
      author: "Suzanne Collins",
      year: 2008,
      availability: "3 de 7 disponibles",
      summary:
        "En una oscura versión del futuro próximo, doce chicos y doce chicas se ven obligados a participar en un reality show llamado Los Juegos del Hambre. Sólo hay una regla: matar o morir. Cuando Katniss Everdeen, una joven de dieciséis años, se presenta voluntaria para ocupar el lugar de su hermana en los juegos, lo entiende como una condena a muerte. Sin embargo, Katniss ya ha visto la muerte de cerca; y la supervivencia forma parte de su naturaleza.",
      publisher: "Molino",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      category: "Aventura",
    },
    {
      id: 2,
      title: "Los Juegos del hambre: En Llamas",
      author: "Suzanne Collins",
      year: 2021,
      availability: "Última unidad disponible",
      summary:
        "Katniss Everdeen ha sobrevivido a Los juegos del hambre. Pero el Capitolio quiere venganza. Contra todo pronóstico, Katniss Everdeen y Peeta Mellark siguen vivos. Aunque Katniss debería sentirse aliviada, se rumorea que existe una rebelión contra el Capitolio, una rebelión que puede que Katniss y Peeta hayan ayudado a inspirar. La nación los observa y hay mucho en juego. Un movimiento en falso y las consecuencias serán inimaginables.",
      publisher: "Molino",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      category: "Aventura",
    },
    {
      id: 3,
      title: "Amanecer en la Cosecha",
      author: "Suzanne Collins",
      year: 2025,
      availability: "Disponible el 14/03",
      summary:
        "Amanecer en la cosecha vuelve al mundo de Panem sesenta y cuatro años antes de los eventos de Los Juegos del Hambre, y comienza en la mañana de la cosecha de los quinhagésimos Juegos del Hambre, también conocidos como el segundo Vasallaje de los Veinticinco.",
      publisher: "Molino",
      coverImage: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=600&fit=crop",
      category: "Aventura",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(book.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
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
                  availability={book.availability}
                  summary={book.summary}
                  publisher={book.publisher}
                  coverImage={book.coverImage}
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
