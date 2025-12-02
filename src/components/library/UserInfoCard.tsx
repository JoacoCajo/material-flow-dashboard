import { Card } from "@/components/ui/card";
import type { User } from "@/types/library";

interface UserInfoCardProps {
  user: User;
  className?: string;
}

const UserInfoCard = ({ user, className = "" }: UserInfoCardProps) => {
  return (
    <Card className={`p-6 bg-sky-200 border-none h-fit ${className}`}>
      <div className="flex gap-4 mb-4">
        <img
          src={user.photo}
          alt={user.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex-1 bg-amber-200 rounded p-3 space-y-1">
          <h4 className="font-semibold text-foreground text-sm">
            Últimos prestamos
          </h4>
          {user.recentLoans.map((loan, index) => (
            <p key={index} className="text-xs text-foreground">
              • {loan}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-200 rounded p-3 space-y-1">
          <p className="font-semibold text-sm text-foreground">Nombre:</p>
          <p className="text-sm text-foreground">{user.name}</p>
          <p className="font-semibold text-sm text-foreground mt-2">Rut:</p>
          <p className="text-sm text-foreground">{user.rut}</p>
          <p className="font-semibold text-sm text-foreground mt-2">Correo:</p>
          <p className="text-sm text-foreground">{user.address}</p>
        </div>
        <div className="bg-amber-200 rounded p-3">
          <p className="font-semibold text-sm text-foreground">Faltas</p>
          <p className="text-sm text-foreground mt-1">{user.penalties}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
