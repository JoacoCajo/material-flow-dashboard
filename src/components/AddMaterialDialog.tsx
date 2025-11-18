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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              required
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

export default AddMaterialDialog;
