import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Shirt, Pant, Customer } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface CartStore {
  shirts: Shirt[];
  pants: Pant[];
  addShirt: (data: Shirt) => void;
  addPant: (data: Pant) => void;
  removeShirt: (id: string) => void;
  removePant: (id: string) => void;
  removeAll: () => void;
  incrementShirtCount: (id: string) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    shirts: [],
    pants: [],

    addShirt: (data: Shirt) => {
      const currentShirts = get().shirts;
      
      const existingShirt = currentShirts.find((shirt) => shirt.id === data.id);
      
      if (existingShirt) {
        return toast('Shirt already in cart.');
      }

      set({ shirts: [...get().shirts, data] });
      toast.success('Shirt added to cart.');
    },
    addPant: (data: Pant) => {
      const currentPants = get().pants;
      const existingPant = currentPants.find((pant) => pant.id === data.id);
      
      if (existingPant) {
        return toast('Pant already in cart.');
      }

      set({ pants: [...get().pants, data] });
      toast.success('Pant added to cart.');
    },
    removeShirt: (id: string) => {
      const currentShirts = get().shirts;
      const shirtToRemove = currentShirts.find((shirt) => shirt.id === id);

      if (!shirtToRemove) {
        return;
      }

      if (shirtToRemove.quantity > 1) {
        const updatedShirts = currentShirts.map((shirt) =>
          shirt.id === id ? { ...shirt, quantity: shirt.quantity - 1 } : shirt
        );
        set({ shirts: updatedShirts });
      } else {
        set({ shirts: currentShirts.filter((shirt) => shirt.id !== id) });
      }

      toast.success('Shirt removed from cart.');
    },
    removePant: (id: string) => {
      set({ pants: [...get().pants.filter((pant) => pant.id !== id)] });
      toast.success('Pant removed from cart.');
    },
    removeAll: () => set({ shirts: [], pants: [] }),
    incrementShirtCount: (id: string) => {
      const currentShirts = get().shirts;
      const shirtToUpdate = currentShirts.find((shirt) => shirt.id === id);

      if (!shirtToUpdate) {
        return toast.error('Shirt not found in cart.');
      }

      const updatedShirts = currentShirts.map((shirt) =>
        shirt.id === id ? { ...shirt, quantity: (shirt.quantity || 0) + 1 } : shirt
      );

      set({ shirts: updatedShirts });
      toast.success('Shirt quantity increased.');
    },
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
);

export default useCart;
