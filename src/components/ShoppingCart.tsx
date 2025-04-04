
import React from 'react';
import CartItem from './CartItem';
import GiftProgressBar from './GiftProgressBar';
import { Card } from '@/components/ui/card';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  subtotal: number;
  threshold: number;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemoveItem: (id: number) => void;
  freeGiftId: number;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  subtotal,
  threshold,
  onUpdateQuantity,
  onRemoveItem,
  freeGiftId
}) => {
  const isGiftAdded = items.some(item => item.id === freeGiftId);
  const cartItems = items.filter(item => item.id !== freeGiftId);
  const freeGift = items.find(item => item.id === freeGiftId);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
      
      <div className="bg-white rounded-md p-4 mb-4 shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Subtotal:</span>
          <span className="font-bold">₹{subtotal}</span>
        </div>
        
        <GiftProgressBar 
          currentAmount={subtotal} 
          threshold={threshold}
          isGiftAdded={isGiftAdded}
        />
      </div>
      
      {items.length > 0 && (
        <div className="bg-white rounded-md shadow-sm border">
          <h3 className="text-lg font-medium mb-2 p-4 pb-2">Cart Items</h3>
          
          <div>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                isFreeGift={false}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
            
            {freeGift && (
              <CartItem
                key={freeGift.id}
                id={freeGift.id}
                name={freeGift.name}
                price={freeGift.price}
                quantity={freeGift.quantity}
                isFreeGift={true}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            )}
          </div>
        </div>
      )}
      
      {items.length === 0 && (
        <div className="bg-white rounded-md p-6 text-center shadow-sm border">
          <p className="text-gray-500 mb-2">Your cart is empty</p>
          <p className="text-gray-400 text-sm">Add some products to see them here!</p>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
