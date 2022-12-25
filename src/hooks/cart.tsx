import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

import { TicketResponse } from 'services/api/types';

interface CartContextData {
  cart: TicketResponse[];
  total: number;
  setCart: (_item: TicketResponse[]) => void;
  addTicket: (_ticket: TicketResponse) => void;
  updateTicket: (_ticket: TicketResponse , _amount: number) => number;
  removeTicket: (_ticket: TicketResponse) => void;
  calcTotal: (_tickets: TicketResponse[]) => void;
}

interface PropsProvider {
  children: ReactNode;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: PropsProvider) {
  const [cart, setCart] = useState<TicketResponse[]>([]);
  const [total, setTotal] = useState(0);

  const addTicket = useCallback((ticket: TicketResponse) => {
    const ticketIndex = cart.findIndex((item) => item.id === ticket.id);

    if (ticketIndex < 0) {
      setCart([...cart, { ...ticket }]);
    } else {
      removeTicket(ticket);
    }
  }, [cart]);

  const updateTicket = useCallback((ticket: TicketResponse, amount: number) => {
    if (amount <= 0 || amount > ticket.totalTickets) return ticket.amount;

    const ticketIndex = cart.findIndex((item) => item.id === ticket.id);
    cart[ticketIndex].amount = amount;

    calcTotal(cart);

    return amount;
  }, [cart]);

  const removeTicket = useCallback((ticket: TicketResponse) => {
    const filterTicket = cart.filter((item) => item.id !== ticket.id);
    setCart(filterTicket);
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
        setCart,
        addTicket,
        updateTicket,
        removeTicket,
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
