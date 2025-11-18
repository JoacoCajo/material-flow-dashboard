import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BookCardProps {
  title: string;
  author: string;
  year: number;
  availability: string;
  summary: string;
  publisher: string;
  coverImage: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const BookCard = ({
  title,
  author,
  year,
  availability,
  summary,
  publisher,
  coverImage,
  isSelected = false,
  onClick,
}: BookCardProps) => {
  return (
    <Card 
      className={cn(
        "p-6 flex gap-6 bg-card hover:shadow-lg transition-all cursor-pointer",
        isSelected && "ring-4 ring-primary shadow-xl"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        <img
          src={coverImage}
          alt={`Portada de ${title}`}
          className="w-32 h-48 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex-1 space-y-2">
        <div>
          <h3 className="font-bold text-lg text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{year}</p>
          <p className="text-sm font-medium text-foreground mt-1">{availability}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Reseña:</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
          <p className="text-xs text-muted-foreground mt-2">Editorial: {publisher}</p>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
