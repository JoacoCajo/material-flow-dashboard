import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";
import { toast } from "sonner";

interface AddMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Usa la URL configurada o, por defecto, el backend en 8009
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

const AddMaterialDialog = ({ open, onOpenChange }: AddMaterialDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
    quantity: "",
    summary: "",
    cover: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedTitle = formData.title.trim();
    if (!normalizedTitle) {
      toast.error("El título es obligatorio");
      return;
    }

    setIsSubmitting(true);

    try {
      // Verificar si ya existe un título igual en la BD
      const searchResponse = await fetch(
        `${API_BASE_URL}/catalogo/buscar/?q=${encodeURIComponent(normalizedTitle)}&page=1&size=5`
      );

      if (!searchResponse.ok) {
        throw new Error("No se pudo validar si el título existe en la BD");
      }

      const searchData = await searchResponse.json();
      const titleExists = Array.isArray(searchData?.items)
        ? searchData.items.some(
            (item: { titulo?: string }) =>
              item?.titulo?.toLowerCase() === normalizedTitle.toLowerCase()
          )
        : false;

      if (titleExists) {
        toast.warning("Ya existe un título con ese nombre en la base de datos");
        return;
      }

      const payload = {
        tipo: "libro",
        titulo: normalizedTitle,
        autor: formData.author.trim(),
        editorial: undefined,
        anio:
          formData.year && !Number.isNaN(Number(formData.year))
            ? Number(formData.year)
            : undefined,
        edicion: formData.isbn || undefined,
        categoria: undefined,
        tipo_medio: "fisico",
      };

      const response = await fetch(`${API_BASE_URL}/documentos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.detail || "No se pudo guardar el material");
      }

      toast.success("Material añadido exitosamente");
      onOpenChange(false);
      setFormData({
        title: "",
        author: "",
        year: "",
        isbn: "",
        quantity: "",
        summary: "",
        cover: null,
      });
    } catch (error) {
      console.error("Error al guardar el material", error);
      const message = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cover: e.target.files[0] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Añadir Material</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium">
              Autor
            </Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-sm font-medium">
              Año publicación
            </Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn" className="text-sm font-medium">
              ISBN
            </Label>
            <Input
              id="isbn"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Existencias
            </Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              placeholder="Autogenerado en la base de datos"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-sm font-medium">
              Resumen
            </Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl min-h-[150px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover" className="text-sm font-medium">
              Subir portada
            </Label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="cover"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">
                  {formData.cover ? formData.cover.name : "Seleccionar archivo"}
                </span>
              </label>
              <Input
                id="cover"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-menu-button hover:bg-menu-button/90 text-menu-foreground rounded-xl font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Solicitud"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMaterialDialog;
