import { Card } from "@/components/ui/card";
import type { Book } from "@/types/library";

interface BookInfoCardProps {
  book: Book;
  showCopies?: boolean;
  className?: string;
}

const BookInfoCard = ({ book, showCopies = true, className = "" }: BookInfoCardProps) => {
  return (
    <Card className={`p-4 bg-sky-200 border-none ${className}`}>
      <div className="flex gap-4">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-24 h-32 object-cover rounded"
        />
        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-foreground">
            Nombre: {book.title}
          </h3>
          <p className="text-sm text-foreground">
            Autor: {book.author}
          </p>
          <p className="text-sm text-foreground">
            Año publicación: {book.year}
          </p>
          <p className="text-sm text-foreground">
            Género: {book.genre}
          </p>
          {showCopies && (
            <p className="text-sm text-foreground">
              Existencias: {book.copies}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookInfoCard;
