import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TicketResponse } from 'services/api/purchase/types';

interface CartContextData {
  cart: TicketResponse[];
  addProduct: (_item: TicketResponse) => void;
}

interface PropsProvider {
  children: ReactNode;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: PropsProvider) {
  const [cart, setCart] = useState<TicketResponse[]>([]);

  const addProduct = (product: TicketResponse) => {
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex < 0) {
      setCart([...cart, { ...product }]);
    } else {
      removeProduct(product);
    }
  };

  const removeProduct = (product: TicketResponse) => {
    const filterProduct = cart.filter((item) => item.id !== product.id);
    setCart(filterProduct);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct
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
