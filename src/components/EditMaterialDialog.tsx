import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";

interface EditMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: {
    id: number;
    titulo: string;
    autor: string;
    anio?: number | null;
    edicion?: string | null;
    categoria?: string | null;
  } | null;
  onUpdated?: (updated: any) => void;
}

const EditMaterialDialog = ({ open, onOpenChange, document, onUpdated }: EditMaterialDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.titulo || "",
        author: document.autor || "",
        year: document.anio ? String(document.anio) : "",
        isbn: document.edicion || "",
        quantity: document.existencias ? String(document.existencias) : "",
      });
    }
  }, [document]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!document) return;

    setIsSubmitting(true);
    try {
      const payload: Record<string, any> = {
        titulo: formData.title.trim(),
        autor: formData.author.trim(),
        anio:
          formData.year && !Number.isNaN(Number(formData.year))
            ? Number(formData.year)
            : undefined,
        edicion: formData.isbn || undefined,
      };
      if (formData.quantity && !Number.isNaN(Number(formData.quantity))) {
        payload.existencias = Number(formData.quantity);
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1"}/documentos/${document.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "No se pudo actualizar el material");
      }

      const updated = await res.json();
      toast.success("Material actualizado exitosamente");
      onUpdated?.(updated);
      onOpenChange(false);
    } catch (error) {
      console.error("Error al actualizar material", error);
      const msg = error instanceof Error ? error.message : "Error al actualizar";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Editar Material</DialogTitle>
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
            <Label htmlFor="edit-title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-author" className="text-sm font-medium">
              Autor
            </Label>
            <Input
              id="edit-author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-year" className="text-sm font-medium">
              Año publicación
            </Label>
            <Input
              id="edit-year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-isbn" className="text-sm font-medium">
              ISBN
            </Label>
            <Input
              id="edit-isbn"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-quantity" className="text-sm font-medium">
              Existencias
            </Label>
            <Input
              id="edit-quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !document}
              className="px-8 py-3 bg-menu-button hover:bg-menu-button/90 text-menu-foreground rounded-xl font-medium disabled:opacity-60"
            >
              {isSubmitting ? "Guardando..." : "Confirmar Solicitud"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMaterialDialog;
