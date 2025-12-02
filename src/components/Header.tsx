import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-header-bg shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/gestion-material" className="flex items-center gap-3 group">
        <BookOpen
          className="w-10 h-10 text-primary group-hover:scale-105 transition-transform"
          strokeWidth={1.5}
        />
        <h1 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          Biblioteca de Estación Central
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground">Admin</span>
        <Link
          to="/"
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <span className="text-sm font-medium text-primary-foreground">A</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
