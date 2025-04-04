
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ShoppingCart from '@/components/ShoppingCart';
import { useToast } from "@/components/ui/use-toast";

// Sample data
const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const { toast } = useToast();

  // Update cart subtotal whenever cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    setCartSubtotal(newSubtotal);
  }, [cartItems]);

  // Handle free gift logic whenever subtotal changes
  useEffect(() => {
    // Check if free gift should be added or removed
    const hasFreeGift = cartItems.some(item => item.id === FREE_GIFT.id);
    
    if (cartSubtotal >= THRESHOLD && !hasFreeGift) {
      // Add free gift
      setCartItems(prev => [...prev, { ...FREE_GIFT, quantity: 1 }]);
      toast({
        title: "Free Gift Added!",
        description: "Wireless Mouse has been added to your cart!",
        duration: 3000,
      });
    } else if (cartSubtotal < THRESHOLD && hasFreeGift) {
      // Remove free gift
      setCartItems(prev => prev.filter(item => item.id !== FREE_GIFT.id));
      toast({
        title: "Free Gift Removed",
        description: "Add more items to qualify for the free gift again.",
        duration: 3000,
      });
    }
  }, [cartSubtotal, toast]);

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart.`,
      duration: 2000,
    });
  };

  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveFromCart = (productId: number) => {
    // Don't allow removing the free gift manually
    if (productId === FREE_GIFT.id) return;
    
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              quantity={0}
              onQuantityChange={() => {}}
            />
          ))}
        </div>
      </section>

      <section>
        <ShoppingCart
          items={cartItems}
          subtotal={cartSubtotal}
          threshold={THRESHOLD}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          freeGiftId={FREE_GIFT.id}
        />
      </section>
    </div>
  );
};

export default Index;
