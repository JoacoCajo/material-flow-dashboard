import { useState, useEffect } from "react";
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
import { X, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface EditMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditMaterialDialog = ({ open, onOpenChange }: EditMaterialDialogProps) => {
  const [formData, setFormData] = useState({
    title: "Los Juegos del hambre",
    author: "Suzanne collins",
    year: "2008",
    isbn: "13019481512",
    quantity: "3",
    summary: "En una oscura versión del futuro próximo, doce chicos y doce chicas se ven obligados a participar en un reality show llamado Los Juegos del Hambre. Sólo hay una regla: matar o morir. Cuando Katniss Everdeen, una joven de dieciséis años, se presenta voluntaria para ocupar el lugar de su hermana en los juegos, lo entiende como una condena a muerte. Sin embargo, Katniss ya ha visto la muerte de cerca; y la supervivencia forma parte de su naturaleza.",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Material actualizado exitosamente");
    onOpenChange(false);
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
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-summary" className="text-sm font-medium">
              Resumen
            </Label>
            <Textarea
              id="edit-summary"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="bg-primary/10 border-0 rounded-xl min-h-[150px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-cover" className="text-sm font-medium">
              Editar Portada
            </Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl hover:bg-primary/20"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="px-8 py-3 bg-menu-button hover:bg-menu-button/90 text-menu-foreground rounded-xl font-medium"
            >
              Confirmar Solicitud
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMaterialDialog;
