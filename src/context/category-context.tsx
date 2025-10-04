'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { products } from '@/lib/placeholder-data';

type Category = {
  id: string;
  name: string;
};

type CategoryContextType = {
  categories: Category[];
  addCategory: (name: string) => void;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
  loading: boolean;
};

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching categories from products data
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const categoryObjects = uniqueCategories.map(name => ({
      id: name,
      name: name
    }));
    setCategories(categoryObjects);
    setLoading(false);
  }, []);
  
  const addCategory = (name: string) => {
    if (!categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
      const newCategory = { id: name, name };
      setCategories(prev => [...prev, newCategory]);
    }
  };

  const updateCategory = (id: string, name: string) => {
    // This is complex as it requires updating all products with the old category.
    // For this simulation, we'll just update the category list.
    // A real implementation would need to handle product updates.
    console.warn("Category update is not fully implemented in this prototype.");
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name: name } : c));
  };

  const deleteCategory = (id: string) => {
     // In a real app, this would require checking if any product is using this category first.
     console.warn("Category deletion is not fully implemented in this prototype.");
     setCategories(prev => prev.filter(c => c.id !== id));
  };


  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
