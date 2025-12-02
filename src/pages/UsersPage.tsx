import { LibraryHeader } from "@/components/library/LibraryHeader";
import { SearchBar } from "@/components/library/SearchBar";
import { UserStatusBadge } from "@/components/library/UserStatusBadge";
import { Card } from "@/components/ui/card";
import { useState } from "react";

type UserStatus = "Activo" | "Sancionado" | "Inactivo";

interface User {
  id: number;
  name: string;
  status: UserStatus;
}

const mockUsers: User[] = [
  { id: 1, name: "Usuario 1", status: "Activo" },
  { id: 2, name: "Usuario 2", status: "Inactivo" },
  { id: 3, name: "Usuario 3", status: "Sancionado" },
  { id: 4, name: "Usuario 4", status: "Activo" },
  { id: 5, name: "Usuario 5", status: "Sancionado" },
  { id: 6, name: "Usuario 6", status: "Inactivo" },
  { id: 7, name: "Usuario 7", status: "Sancionado" },
  { id: 8, name: "Usuario 8", status: "Activo" },
  { id: 9, name: "Usuario 9", status: "Sancionado" },
  { id: 10, name: "Usuario 10", status: "Inactivo" },
  { id: 11, name: "Usuario 11", status: "Activo" },
  { id: 12, name: "Usuario 12", status: "Sancionado" },
];

const UsersPage = () => {
  const [users] = useState<User[]>(mockUsers);

  return (
    <div className="min-h-screen bg-background">
      <LibraryHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <SearchBar 
            placeholder="Nombre de usuario"
            onSearch={(value) => console.log("Searching:", value)}
          />
        </div>

        <Card className="p-4">
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <span className="text-foreground font-medium">{user.name}</span>
                <UserStatusBadge status={user.status} />
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default UsersPage;
