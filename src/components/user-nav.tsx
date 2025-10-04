'use client';

import React, { useState, useContext } from "react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User as UserIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserContext } from "@/context/user-context";
import type { UserStatus } from '@/lib/placeholder-data';
import { useRouter } from "next/navigation";
import { renderAvatar } from "@/lib/user-avatar";

const statusConfig: Record<UserStatus, { color: string; label: string }> = {
    Activo: {
      color: "bg-green-500",
      label: "Activo",
    },
    Ausente: {
      color: "bg-yellow-500",
      label: "Ausente",
    },
    Ocupado: {
      color: "bg-red-500",
      label: "Ocupado",
    },
    Inactivo: {
        color: "bg-gray-400",
        label: "Inactivo"
    }
  };

const StatusCircle = ({ status }: { status: UserStatus }) => (
    <span className={cn(
        "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background",
        statusConfig[status]?.color || 'bg-gray-400'
    )} />
);


export function UserNav() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    return null; // Or a loading spinner
  }
  
  const { currentUser, setCurrentUser, users, setUsers } = userContext;


  const handleStatusChange = (value: UserStatus) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, status: value };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    }
    setProfileOpen(false);
  }
  
  const handleLogout = () => {
    if (userContext.handleLogout) {
      userContext.handleLogout();
      router.push('/login');
    }
  };

  if (!currentUser) {
    return null;
  }

  const settingsLink = currentUser.role === 'Administrador' ? '/dashboard/settings' : '/dashboard/settings/users';


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
             {renderAvatar(currentUser)}
             <StatusCircle status={currentUser.status} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setProfileOpen(true)}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
               <Link href={settingsLink}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isProfileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Estado del Perfil</DialogTitle>
                <DialogDescription>
                    Selecciona tu estado actual para que tu equipo lo sepa.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="status-select">Establecer Estado</Label>
                    <Select defaultValue={currentUser.status} onValueChange={(value: UserStatus) => handleStatusChange(value)}>
                        <SelectTrigger id="status-select">
                            <SelectValue placeholder="Selecciona tu estado" />
                        </SelectTrigger>
                        <SelectContent>
                           {Object.entries(statusConfig).map(([status, config]) => (
                                <SelectItem key={status} value={status}>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("h-2 w-2 rounded-full", config.color)} />
                                        {config.label}
                                    </div>
                                </SelectItem>
                           ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setProfileOpen(false)}>Cerrar</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
