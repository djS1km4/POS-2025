'use client';

import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products as initialProducts, Product } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Image as ImageIcon, Pencil, Trash2, Shapes } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ReorderForm } from "./components/reorder-form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategoryContext } from "@/context/category-context";
import { Combobox } from "@/components/ui/combobox";

function getStockStatus(stock: number): { text: string; variant: "default" | "secondary" | "destructive" | "outline" } {
  if (stock === 0) return { text: "Agotado", variant: "destructive" };
  if (stock < 10) return { text: "Stock bajo", variant: "secondary" };
  return { text: "En stock", variant: "default" };
}

function CategoryManager({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const categoryContext = useContext(CategoryContext);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState<{ id: string, name: string } | null>(null);

    if (!categoryContext) return null;
    const { categories, addCategory, updateCategory, deleteCategory } = categoryContext;

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            addCategory(newCategoryName.trim());
            setNewCategoryName('');
        }
    };
    
    const handleUpdateCategory = () => {
        if (editingCategory && editingCategory.name.trim()) {
            updateCategory(editingCategory.id, editingCategory.name.trim());
            setEditingCategory(null);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gestionar Categorías</DialogTitle>
                    <CardDescription>Añade, edita o elimina las categorías de tus productos.</CardDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Nombre de la nueva categoría"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <Button onClick={handleAddCategory}>Agregar</Button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {categories.map(cat => (
                            <div key={cat.id} className="flex items-center justify-between p-2 border rounded-md">
                                {editingCategory?.id === cat.id ? (
                                    <Input
                                        value={editingCategory.name}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                        className="flex-1"
                                    />
                                ) : (
                                    <span className="flex-1">{cat.name}</span>
                                )}
                                <div className="flex gap-1">
                                     {editingCategory?.id === cat.id ? (
                                        <Button size="sm" onClick={handleUpdateCategory}>Guardar</Button>
                                     ) : (
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingCategory(cat)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                     )}
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => deleteCategory(cat.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function InventoryPage() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [editingProductImage, setEditingProductImage] = useState<string | null>(null);
  const [newProductCategory, setNewProductCategory] = useState('');
  const [editingProductCategory, setEditingProductCategory] = useState('');
  const [isCategoryManagerOpen, setCategoryManagerOpen] = useState(false);
  const categoryContext = useContext(CategoryContext);
  
  useEffect(() => {
    if (editingProduct) {
      setEditingProductImage(editingProduct.imageUrl);
      setEditingProductCategory(editingProduct.category);
    } else {
      setEditingProductImage(null);
      setEditingProductCategory('');
    }
  }, [editingProduct]);

  const categoryOptions = categoryContext ? categoryContext.categories.map(c => ({ value: c.name, label: c.name })) : [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };
  
  const handleEditSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formData = new FormData(e.currentTarget);
    const updatedProduct = {
      ...editingProduct,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      sku: formData.get('sku') as string,
      category: editingProductCategory,
      imageUrl: editingProductImage || editingProduct.imageUrl,
      imageHint: formData.get('imageHint') as string,
      cost: Number(formData.get('cost') ?? editingProduct.cost),
    };
    
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  }

  const handleDeleteClick = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, forEditing: boolean) => {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              if (forEditing) {
                setEditingProductImage(reader.result as string);
              } else {
                setNewProductImage(reader.result as string);
              }
          };
          reader.readAsDataURL(file);
      }
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: formData.get('name') as string,
      category: newProductCategory || 'General',
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      sku: formData.get('sku') as string || `SKU-${Date.now()}`,
      imageUrl: newProductImage || `https://picsum.photos/seed/${Date.now()}/200/150`,
      imageHint: formData.get('imageHint') as string || 'new product',
      cost: Number(formData.get('cost') || 0),
    };
    setProducts([newProduct, ...products]);
    setAddDialogOpen(false);
    setNewProductImage(null);
    setNewProductCategory('');
    (e.target as HTMLFormElement).reset();
  };
    
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-bold tracking-tight">Inventario</CardTitle>
            <CardDescription>Gestiona tus productos y niveles de stock.</CardDescription>
          </div>
          <div className="flex gap-2">
              <ReorderForm />
              <Button onClick={() => setCategoryManagerOpen(true)}>
                <Shapes className="mr-2 h-4 w-4" /> Gestionar Categorías
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Agregar Producto
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                    <CardDescription>Completa la información para registrar un nuevo artículo en tu inventario.</CardDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddProduct}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                      {/* Left Column for Image */}
                      <div className="flex flex-col items-center justify-center gap-2">
                          <div className="flex h-40 w-40 items-center justify-center rounded-md border-2 border-dashed bg-muted">
                              {newProductImage ? (
                                  <Image src={newProductImage} alt="Previsualización del producto" width={160} height={160} className="object-contain rounded-md" />
                              ) : (
                                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                              )}
                          </div>
                          <input type="file" id="image-upload" onChange={(e) => handleImageUpload(e, false)} accept="image/*" className="hidden" />
                          <Button type="button" size="sm" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>Subir Imagen</Button>
                      </div>
                      
                      {/* Right Column for data */}
                      <div className="grid gap-4">
                          <div className="grid gap-2">
                              <Label htmlFor="add-name">Nombre del Producto</Label>
                              <Input id="add-name" name="name" placeholder="Ej: Café Americano" required />
                          </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="add-price">Precio</Label>
                                <Input id="add-price" name="price" type="number" placeholder="Ej: 5000" required />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="add-stock">Stock Inicial</Label>
                                <Input id="add-stock" name="stock" type="number" placeholder="Ej: 100" required />
                              </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="add-sku">SKU (Código)</Label>
                                <Input id="add-sku" name="sku" placeholder="Ej: CF-002" />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="add-category">Categoría</Label>
                                <Combobox
                                    options={categoryOptions}
                                    value={newProductCategory}
                                    onSelect={setNewProductCategory}
                                    placeholder="Seleccionar categoría..."
                                    searchPlaceholder="Buscar categoría..."
                                />
                            </div>
                          </div>
                           <div className="grid gap-2">
                                <Label htmlFor="add-imageHint">Descripción de Imagen (para IA)</Label>
                                <Input id="add-imageHint" name="imageHint" placeholder="Ej: taza de café" />
                            </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>Cancelar</Button>
                      <Button type="submit">Agregar Producto</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Imagen</span>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="hidden md:table-cell">
                  Stock
                </TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const status = getStockStatus(product.stock);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.imageUrl}
                        width="64"
                        data-ai-hint={product.imageHint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.text}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.stock}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditClick(product)}>Editar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(product.id)}>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={!!editingProduct} onOpenChange={(isOpen) => !isOpen && setEditingProduct(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Producto: {editingProduct?.name}</DialogTitle>
             <CardDescription>Actualiza la información de este artículo.</CardDescription>
          </DialogHeader>
          <form onSubmit={handleEditSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-40 w-40 items-center justify-center rounded-md border-2 border-dashed bg-muted">
                        {editingProductImage ? (
                            <Image src={editingProductImage} alt="Previsualización del producto" width={160} height={160} className="object-contain rounded-md" />
                        ) : (
                            <ImageIcon className="h-16 w-16 text-muted-foreground" />
                        )}
                    </div>
                    <input type="file" id="edit-image-upload" onChange={(e) => handleImageUpload(e, true)} accept="image/*" className="hidden" />
                    <Button type="button" size="sm" variant="outline" onClick={() => document.getElementById('edit-image-upload')?.click()}>Cambiar Imagen</Button>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre del Producto</Label>
                        <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Precio</Label>
                            <Input id="price" name="price" type="number" defaultValue={editingProduct?.price} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="sku">SKU (Código)</Label>
                            <Input id="sku" name="sku" defaultValue={editingProduct?.sku} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoría</Label>
                             <Combobox
                                options={categoryOptions}
                                value={editingProductCategory}
                                onSelect={setEditingProductCategory}
                                placeholder="Seleccionar categoría..."
                                searchPlaceholder="Buscar categoría..."
                            />
                        </div>
                    </div>
                     <div className="grid gap-2">
                          <Label htmlFor="imageHint">Descripción de Imagen (para IA)</Label>
                          <Input id="imageHint" name="imageHint" defaultValue={editingProduct?.imageHint} />
                      </div>
                </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancelar</Button>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <CategoryManager open={isCategoryManagerOpen} onOpenChange={setCategoryManagerOpen} />
    </>
  );
}
