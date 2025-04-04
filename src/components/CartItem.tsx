
import React from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isFreeGift?: boolean;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  isFreeGift = false,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      onRemove(id);
    }
  };

  return (
    <div className="px-4 py-3 border-b last:border-b-0">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="text-sm text-gray-600">
            ₹{price} × {quantity} = ₹{price * quantity}
          </div>
        </div>
        
        <div className="flex items-center">
          {!isFreeGift ? (
            <>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={handleDecrease}
                className="h-7 w-7 rounded-md"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="mx-3 w-6 text-center">{quantity}</span>
              <Button 
                variant="default" 
                size="icon" 
                onClick={handleIncrease}
                className="h-7 w-7 bg-green-500 hover:bg-green-600 rounded-md"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">FREE GIFT</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
