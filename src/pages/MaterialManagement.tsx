import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import FilterSidebar from "@/components/FilterSidebar";
import BookCard from "@/components/BookCard";
import AddMaterialDialog from "@/components/AddMaterialDialog";
import EditMaterialDialog from "@/components/EditMaterialDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

type DocumentItem = {
  id: number;
  titulo: string;
  autor: string;
  anio?: number | null;
  categoria?: string | null;
  editorial?: string | null;
  resumen?: string | null;
  tipo?: string | null;
  tipo_medio?: string | null;
  existencias?: number | null;
  };

const MaterialManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const { data: user } = useAuthUser();
  const isAdmin = user?.rol === "admin";
  const navigate = useNavigate();

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

  const handleSearch = async () => {
    const term = searchQuery.trim();
    if (!term) {
      toast.error("Ingresa un término de búsqueda");
      return;
    }
    setLoadingDocs(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/catalogo/buscar/?q=${encodeURIComponent(term)}&page=1&size=50`
      );
      if (!res.ok) {
        throw new Error("No se pudo buscar en el catálogo");
      }
      const data = await res.json();
      setDocuments(Array.isArray(data?.items) ? data.items : []);
    } catch (error) {
      console.error("Error en búsqueda", error);
      toast.error("No se pudo realizar la búsqueda");
    } finally {
      setLoadingDocs(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoadingDocs(true);
      try {
        const res = await fetch(`${API_BASE_URL}/documentos/?page=1&size=100`);
        if (!res.ok) {
          throw new Error("No se pudieron obtener los documentos");
        }
        const data = await res.json();
        setDocuments(Array.isArray(data?.items) ? data.items : []);
      } catch (error) {
        console.error("Error al cargar documentos", error);
        toast.error("No se pudieron cargar los materiales");
      } finally {
        setLoadingDocs(false);
      }
    };

    fetchDocuments();
  }, []);

  const filteredBooks = useMemo(() => {
    return documents.filter((doc) => {
      const search = searchQuery.toLowerCase();
      const matchesSearch =
        search === "" ||
        doc.titulo.toLowerCase().includes(search) ||
        doc.autor.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategories.length === 0 ||
        (doc.categoria ? selectedCategories.includes(doc.categoria) : false);

      return matchesSearch && matchesCategory;
    });
  }, [documents, searchQuery, selectedCategories]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AddMaterialDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      <EditMaterialDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        document={documents.find((doc) => doc.id === selectedBookId) || null}
        onUpdated={(updated) => {
          setDocuments((prev) =>
            prev.map((d) => (d.id === updated.id ? updated : d))
          );
        }}
      />

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
                className="px-8 py-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                variant="default"
              >
                Buscar
              </Button>
              <Button
                onClick={() => navigate("/busqueda-filtros")}
                variant="outline"
                className="px-6 py-6 rounded-xl"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtros avanzados
              </Button>
            </div>

            {/* Botones de acción (solo admins) */}
            {isAdmin && (
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
            )}

            {/* Lista de libros */}
            <div className="space-y-6">
              {loadingDocs && (
                <div className="text-center py-12 text-muted-foreground">Cargando materiales...</div>
              )}

              {!loadingDocs && filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.titulo}
                  author={book.autor}
                  year={book.anio || 0}
                  availability={
                    book.existencias != null
                      ? `${book.existencias} existencias`
                      : book.tipo_medio || "Disponible"
                  }
                  summary={
                    book.resumen && book.resumen.trim().length > 0
                      ? book.resumen
                      : "Sin resumen"
                  }
                  publisher={book.editorial || "Sin editorial"}
                  coverImage={undefined}
                  isSelected={selectedBookId === book.id}
                  onClick={() => handleBookSelect(book.id!)}
                />
              ))}

              {!loadingDocs && filteredBooks.length === 0 && (
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
