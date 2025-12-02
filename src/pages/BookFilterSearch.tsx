import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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

type SortOption = "titulo" | "autor" | "anio_asc" | "anio_desc";

const BookFilterSearch = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  // Filtros
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedEditorial, setSelectedEditorial] = useState<string>("");
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("titulo");

  // Obtener opciones únicas para los filtros
  const filterOptions = useMemo(() => {
    const categories = [...new Set(documents.map((d) => d.categoria).filter(Boolean))] as string[];
    const authors = [...new Set(documents.map((d) => d.autor).filter(Boolean))] as string[];
    const editorials = [...new Set(documents.map((d) => d.editorial).filter(Boolean))] as string[];
    return { categories, authors, editorials };
  }, [documents]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAuthor("");
    setSelectedEditorial("");
    setYearFrom("");
    setYearTo("");
    setOnlyAvailable(false);
    setSortBy("titulo");
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

  const filteredAndSortedBooks = useMemo(() => {
    let result = documents.filter((doc) => {
      // Filtro por categoría
      if (selectedCategories.length > 0) {
        if (!doc.categoria || !selectedCategories.includes(doc.categoria)) {
          return false;
        }
      }

      // Filtro por autor
      if (selectedAuthor && doc.autor !== selectedAuthor) {
        return false;
      }

      // Filtro por editorial
      if (selectedEditorial && doc.editorial !== selectedEditorial) {
        return false;
      }

      // Filtro por año desde
      if (yearFrom && doc.anio && doc.anio < parseInt(yearFrom)) {
        return false;
      }

      // Filtro por año hasta
      if (yearTo && doc.anio && doc.anio > parseInt(yearTo)) {
        return false;
      }

      // Filtro solo disponibles
      if (onlyAvailable && (doc.existencias == null || doc.existencias <= 0)) {
        return false;
      }

      return true;
    });

    // Ordenar
    result.sort((a, b) => {
      switch (sortBy) {
        case "titulo":
          return a.titulo.localeCompare(b.titulo);
        case "autor":
          return a.autor.localeCompare(b.autor);
        case "anio_asc":
          return (a.anio || 0) - (b.anio || 0);
        case "anio_desc":
          return (b.anio || 0) - (a.anio || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [documents, selectedCategories, selectedAuthor, selectedEditorial, yearFrom, yearTo, onlyAvailable, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Búsqueda por Filtros</h1>

        <div className="flex gap-6">
          {/* Panel de filtros */}
          <aside className="w-72 flex-shrink-0">
            <div className="bg-card rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Filtros</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Limpiar
                </Button>
              </div>

              {/* Ordenar por */}
              <div className="space-y-2">
                <Label>Ordenar por</Label>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="titulo">Título (A-Z)</SelectItem>
                    <SelectItem value="autor">Autor (A-Z)</SelectItem>
                    <SelectItem value="anio_desc">Año (más reciente)</SelectItem>
                    <SelectItem value="anio_asc">Año (más antiguo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Categorías */}
              <div className="space-y-2">
                <Label>Categorías</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Autor */}
              <div className="space-y-2">
                <Label>Autor</Label>
                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los autores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los autores</SelectItem>
                    {filterOptions.authors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Editorial */}
              <div className="space-y-2">
                <Label>Editorial</Label>
                <Select value={selectedEditorial} onValueChange={setSelectedEditorial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las editoriales" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas las editoriales</SelectItem>
                    {filterOptions.editorials.map((editorial) => (
                      <SelectItem key={editorial} value={editorial}>
                        {editorial}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rango de años */}
              <div className="space-y-2">
                <Label>Año de publicación</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Desde"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    placeholder="Hasta"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Solo disponibles */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="only-available"
                  checked={onlyAvailable}
                  onCheckedChange={(checked) => setOnlyAvailable(checked === true)}
                />
                <Label htmlFor="only-available" className="cursor-pointer">
                  Solo con existencias
                </Label>
              </div>
            </div>
          </aside>

          {/* Lista de resultados */}
          <div className="flex-1 space-y-4">
            <div className="text-sm text-muted-foreground">
              {filteredAndSortedBooks.length} resultado(s) encontrado(s)
            </div>

            {loadingDocs && (
              <div className="text-center py-12 text-muted-foreground">Cargando materiales...</div>
            )}

            {!loadingDocs && filteredAndSortedBooks.map((book) => (
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
                isSelected={false}
                onClick={() => {}}
              />
            ))}

            {!loadingDocs && filteredAndSortedBooks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron libros con los filtros seleccionados
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookFilterSearch;
