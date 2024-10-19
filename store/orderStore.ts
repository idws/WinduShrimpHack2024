// store/orderStore.ts

import { create } from "zustand";
import { produce } from "immer";

type OrderProduct = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  productId: number
};

type OrderStatus = "ordered" | "onProcess" | "onDeliver" | "delivered";

type OrderObject = {
  id: number;
  name: string;
  phone: string;
  orders: OrderProduct[];
  status: OrderStatus;
};

type OrderStoreState = {
  orders: OrderObject[];
  visibleCards: number[];

  // Functions to manipulate state
  toggleCardVisibility: (cardId: number) => void;
  changeOrderStatus: (orderId: number, newStatus: OrderStatus) => void;
  getOrdersByStatus: (status: OrderStatus) => OrderObject[];
};

// Zustand store for order management
export const useOrderStore = create<OrderStoreState>((set, get) => ({
  orders: [
    { id: 1, name: "Dhama", phone: "+628129999999", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "ordered" },
    { id: 2, name: "Rudy", phone: "+628129999998", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "ordered" },
    { id: 3, name: "Dewa", phone: "+628129999997", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "ordered" },
    { id: 4, name: "Dhama", phone: "+628129999999", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "onProcess" },
    { id: 5, name: "Rudy", phone: "+628129999998", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "onProcess" },
    { id: 6, name: "Dewa", phone: "+628129999997", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "onProcess" },
    { id: 7, name: "Dhama", phone: "+628129999999", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "onDeliver" },
    { id: 8, name: "Rudy", phone: "+628129999998", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "onDeliver" },
    { id: 9, name: "Dewa", phone: "+628129999997", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "onDeliver" },
    { id: 10, name: "Dhama", phone: "+628129999999", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "delivered" },
    { id: 11, name: "Rudy", phone: "+628129999998", orders: [{id: 123, name: 'Udang PND', quantity: 3, price: 50000, productId: 3}, {id: 124, name: 'Udang HOSO', quantity: 2, price: 40000, productId: 2}], status: "delivered" },
  ],

  visibleCards: [],

  toggleCardVisibility: (cardId: number) => set(
    produce((state: OrderStoreState) => {
      const index = state.visibleCards.indexOf(cardId);
      if (index > -1) {
        state.visibleCards.splice(index, 1);
      } else {
        state.visibleCards.push(cardId);
      }
    })
  ),

  changeOrderStatus: (orderId: number, newStatus: OrderStatus) => set(
    produce((state: OrderStoreState) => {
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      if (orderIndex > -1) {
        state.orders[orderIndex].status = newStatus;
      }
    })
  ),

  getOrdersByStatus: (status: OrderStatus) => {
    return get().orders.filter(order => order.status === status);
  },
}));