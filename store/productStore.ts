// store/orderStore.ts

import { ImageSourcePropType } from "react-native";
import { create } from "zustand/react";
import { produce } from "immer";

type product = {
  id: number,
  source: ImageSourcePropType | null,
  name: string,
  price: string,
  quantity: number
}

type ProductStoreState = {
  product: product[];

  // Functions to manipulate state
  addStock: (productId: number, quantity: number) => void;
  addProduct: (newProduct: product) => void;
};

// Zustand store for order management
export const useProductStore = create<ProductStoreState>((set) => ({
  product: [
    {id: 1, source: require('@/assets/images/Ebi_furai.png'), name: 'Ebi Furai', price: 'Rp 90.000', quantity: 4},
    {id: 2, source: require('@/assets/images/Udang_HOSO.png'), name: 'Udang HOSO', price: 'Rp 90.000', quantity: 3},
    {id: 3, source: require('@/assets/images/Udang_PND.png'), name: 'Udang PND', price: 'Rp 90.000', quantity: 2},
    {id: 4, source: require('@/assets/images/Dori_BL.png'), name: 'Dori BL', price: 'Rp 50.000', quantity: 1},
    {id: 5, source: require('@/assets/images/Dori_NBL.png'), name: 'Dori NBL', price: 'Rp 40.000', quantity: 0},
    {id: 6, source: require('@/assets/images/bakso_udang.jpg'), name: 'Bakso Udang', price: 'Rp 10.000', quantity: 0},
    {id: 7, source: require('@/assets/images/udang_balon.jpg'), name: 'Udang Balon', price: 'Rp 10.000', quantity: 3},
    {id: 8, source: require('@/assets/images/siomay_udang.jpeg'), name: 'Siomay Udang', price: 'Rp 10.000', quantity: 1},
  ],

  // Assume similarly you can add more functions to manage state changes, like moving orders to processed.
  addStock: (productId: number, quantity: number) => 
    set(produce((state: ProductStoreState) => {
      const productToUpdate = state.product.find(p => p.id === productId);
      if (productToUpdate) {
        productToUpdate.quantity += quantity;
      }
    })),

  addProduct: (newProduct: product) => set((state) => {
    return {
      product: [...state.product, newProduct]
    }
  }),
}));