// AppContext.jsx
'use client';

import { SessionProvider } from "next-auth/react"; // Handles session management for authentication
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Context for cart management
export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  if (!cartProduct) return 0;

  let price = cartProduct.basePrice || 0;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart from localStorage on initial render (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = window.localStorage.getItem('cart');
      if (savedCart) {
        setCartProducts(JSON.parse(savedCart));
      }
    }
  }, []);

  // Clear cart and remove it from localStorage
  function clearCart() {
    setCartProducts([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cart');
    }
    toast.success('Cart cleared');
  }

  // Remove a product from the cart based on its index
  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const updatedCart = prevCartProducts.filter((_, index) => index !== indexToRemove);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      toast.success('Product removed');
      return updatedCart;
    });
  }

  // Add a product to the cart and save it to localStorage
  function addToCart(product, size = null, extras = []) {
    const cartProduct = { ...product, size, extras };
    setCartProducts(prevProducts => {
      const updatedProducts = [...prevProducts, cartProduct];
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cart', JSON.stringify(updatedProducts));
      }
      return updatedProducts;
    });
  }

  return (
    <SessionProvider> {/* Wrap children with SessionProvider to handle authentication session */}
      <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
