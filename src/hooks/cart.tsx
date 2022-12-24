import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

import { TicketResponse } from 'services/api/purchase/types';

interface CartContextData {
  cart: TicketResponse[];
  total: number;
  addProduct: (_ticket: TicketResponse) => void;
  updateProduct: (_ticket: TicketResponse , _amount: number) => number;
  removeProduct: (_ticket: TicketResponse) => void;
  calcTotal: (_tickets: TicketResponse[]) => void;
}

interface PropsProvider {
  children: ReactNode;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: PropsProvider) {
  const [cart, setCart] = useState<TicketResponse[]>([]);
  const [total, setTotal] = useState(0);

  const addProduct = useCallback((ticket: TicketResponse) => {
    const productIndex = cart.findIndex((item) => item.id === ticket.id);

    if (productIndex < 0) {
      setCart([...cart, { ...ticket }]);
    } else {
      removeProduct(ticket);
    }
  }, [cart]);

  const updateProduct = useCallback((ticket: TicketResponse, amount: number) => {
    if (amount <= 0 || amount > ticket.totalTickets) return ticket.amount;

    const productIndex = cart.findIndex((item) => item.id === ticket.id);
    cart[productIndex].amount = amount;

    calcTotal(cart);

    return amount;
  }, [cart]);

  const removeProduct = useCallback((ticket: TicketResponse) => {
    const filterProduct = cart.filter((item) => item.id !== ticket.id);
    setCart(filterProduct);
  }, [cart]);

  const calcTotal = useCallback((tickets: TicketResponse[]) => {
    const calc = tickets.reduce((total, item) => {
      return total + item.amount * item.price;
    }, 0);

    setTotal(calc);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addProduct,
        updateProduct,
        removeProduct,
        calcTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
