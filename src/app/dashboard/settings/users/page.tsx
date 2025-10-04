'use client';
import { useState, useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserContext } from "@/context/user-context";
import { User, UserRole } from '@/lib/placeholder-data';
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { defaultAvatars, renderAvatar } from '@/lib/user-avatar';


const getRoleBadgeVariant = (role: UserRole): "default" | "secondary" | "outline" | "destructive" | "success" | "info" => {
    switch (role) {
        case 'Administrador':
            return 'default';
        case 'Mesero':
        case 'Vendedor':
            return 'info';
        case 'Bartender':
        case 'Cajero':
            return 'success';
        default:
            return 'secondary';
    }
};

export default function UserManagementPage() {
    const userContext = useContext(UserContext);
    
    if (!userContext) {
        throw new Error("UserManagementPage must be used within a UserProvider");
    }

    const { users, setUsers } = userContext;
    const [isAddOpen, setAddOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isAvatarDialogOpen, setAvatarDialogOpen] = useState(false);
    const [avatarZoom, setAvatarZoom] = useState(1);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newUser: User = {
            id: `user_${Date.now()}`,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            role: formData.get('role') as UserRole,
            avatarUrl: 'default:smile-icon',
            status: 'Activo',
            avatarZoom: 1
        };
        setUsers([newUser, ...users]);
        setAddOpen(false);
    };

    const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingUser) return;
        const formData = new FormData(e.currentTarget);
        const updatedUser = {
            ...editingUser,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as UserRole,
        };
        setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
        setEditingUser(null);
        setIsEditDialogOpen(false);
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(u => u.id !== userId));
    };

    const handleToggleStatus = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' } : u));
    };
    
    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0] && editingUser) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingUser({ ...editingUser, avatarUrl: reader.result as string, avatarZoom: 1 });
                setAvatarZoom(1);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSelectDefaultAvatar = (avatar: { id: string, icon: React.ReactNode }) => {
        if (editingUser) {
             const avatarIdentifier = `default:${avatar.id}`;
             setEditingUser({ ...editingUser, avatarUrl: avatarIdentifier, avatarZoom: 1 });
             setAvatarZoom(1);
        }
    };
    
    const handleZoomChange = (value: number[]) => {
       setAvatarZoom(value[0]);
    }

    const handleAvatarDialogSave = () => {
        if(editingUser) {
            const updatedUser = {...editingUser, avatarZoom: avatarZoom };
            setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
        }
        setAvatarDialogOpen(false);
        setEditingUser(null);
        setIsEditDialogOpen(false);
    }
    
    const handleOpenEditDialog = (user: User) => {
        setEditingUser(user);
        setAvatarZoom(user.avatarZoom || 1);
        setIsEditDialogOpen(true);
    }

    const handleCloseEditDialog = () => {
        setEditingUser(null);
        setAvatarZoom(1);
        setIsEditDialogOpen(false);
    }
    
    const handleOpenAvatarDialog = () => {
        if(editingUser){
            setAvatarZoom(editingUser.avatarZoom || 1);
            setAvatarDialogOpen(true);
        }
    }

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-bold tracking-tight">Gestión de Usuarios</CardTitle>
                        <CardDescription>
                            Gestiona las cuentas de usuario y sus roles en el sistema.
                        </CardDescription>
                    </div>
                    <Dialog open={isAddOpen} onOpenChange={setAddOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Agregar Usuario
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddUser}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="add-name">Nombre Completo</Label>
                                        <Input id="add-name" name="name" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <Input id="email" name="email" type="email" placeholder="nombre@ejemplo.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Rol</Label>
                                        <Select name="role" required defaultValue="Mesero">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Administrador">Administrador</SelectItem>
                                                <SelectItem value="Mesero">Mesero</SelectItem>
                                                <SelectItem value="Vendedor">Vendedor</SelectItem>
                                                <SelectItem value="Bartender">Bartender</SelectItem>
                                                <SelectItem value="Cajero">Cajero</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                     <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancelar</Button>
                                     <Button type="submit">Agregar Usuario</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>
                                    <span className="sr-only">Acciones</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {renderAvatar(user)}
                                            <div className="grid gap-0.5">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getRoleBadgeVariant(user.role)}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${user.status === 'Activo' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} `}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleOpenEditDialog(user)}>Editar</DropdownMenuItem>
                                                {user.status === 'Activo' ? (
                                                    <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>Desactivar</DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>Activar</DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>Eliminar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isEditDialogOpen} onOpenChange={handleCloseEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Usuario</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditUser}>
                        <div className="grid gap-4 py-4">
                             <div className="space-y-2">
                                <Label>Avatar</Label>
                                <div className="flex items-center gap-4">
                                     {editingUser && renderAvatar(editingUser, true)}
                                    <Button type="button" variant="outline" onClick={handleOpenAvatarDialog}>Cambiar Avatar</Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nombre</Label>
                                <Input id="edit-name" name="name" defaultValue={editingUser?.name} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-email">Correo Electrónico</Label>
                                <Input id="edit-email" name="email" type="email" defaultValue={editingUser?.email} required />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="edit-password">Nueva Contraseña (opcional)</Label>
                                <Input id="edit-password" name="password" type="password" placeholder="Dejar en blanco para no cambiar" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-role">Rol</Label>
                                <Select name="role" required defaultValue={editingUser?.role}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Administrador">Administrador</SelectItem>
                                        <SelectItem value="Mesero">Mesero</SelectItem>
                                        <SelectItem value="Vendedor">Vendedor</SelectItem>
                                        <SelectItem value="Bartender">Bartender</SelectItem>
                                        <SelectItem value="Cajero">Cajero</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleCloseEditDialog}>Cancelar</Button>
                            <Button type="submit">Guardar Cambios</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

             <Dialog open={isAvatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Seleccionar un Avatar</DialogTitle>
                        <DialogDescription>
                            Elige un avatar predeterminado o sube tu propia imagen.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-6">
                        <div className='flex justify-center'>
                           <div className="w-32 h-32 rounded-full overflow-hidden border-2 flex items-center justify-center">
                               {editingUser?.avatarUrl && !editingUser.avatarUrl.startsWith('default:') ? (
                                    <Image 
                                        src={editingUser.avatarUrl} 
                                        alt="Avatar Preview" 
                                        width={128} 
                                        height={128} 
                                        className="object-cover w-full h-full"
                                        style={{ transform: `scale(${avatarZoom})` }}
                                    />
                               ): (
                                <div className='flex items-center justify-center w-full h-full bg-muted'>
                                    {editingUser?.avatarUrl && defaultAvatars.find(a => a.id === editingUser.avatarUrl.split(':')[1])?.icon}
                                </div>
                               )}
                           </div>
                        </div>

                         {editingUser?.avatarUrl && !editingUser.avatarUrl.startsWith('default:') && (
                            <div className="grid gap-2">
                                <Label htmlFor="avatar-zoom">Zoom</Label>
                                <Slider
                                    id="avatar-zoom"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={[avatarZoom]}
                                    onValueChange={handleZoomChange}
                                />
                            </div>
                         )}

                        <div>
                            <h4 className="mb-4 text-sm font-medium">Avatares Predeterminados</h4>
                            <div className="grid grid-cols-4 gap-4">
                                {defaultAvatars.map((avatar) => (
                                    <Button key={avatar.id} type="button" variant="outline" className="h-20 w-20" onClick={() => handleSelectDefaultAvatar(avatar)}>
                                        {avatar.icon}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                             <h4 className="mb-2 text-sm font-medium">Subir Imagen</h4>
                             <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarUpload} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setAvatarDialogOpen(false)}>Cancelar</Button>
                        <Button type="button" onClick={handleAvatarDialogSave}>Guardar Avatar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
