import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-header-bg shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BookOpen className="w-10 h-10 text-primary" strokeWidth={1.5} />
        <h1 className="text-xl font-semibold text-foreground">
          Biblioteca de Estación Central
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground">Admin</span>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-sm font-medium text-primary-foreground">A</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
