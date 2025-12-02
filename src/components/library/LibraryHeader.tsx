import { BookOpen } from "lucide-react";

export const LibraryHeader = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-semibold text-foreground">
          Biblioteca de Estación Central
        </h1>
      </div>
    </header>
  );
};
