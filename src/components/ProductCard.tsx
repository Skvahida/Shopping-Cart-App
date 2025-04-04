
import React from 'react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border">
      <h3 className="font-medium mb-1">{product.name}</h3>
      <p className="text-gray-700 mb-3">₹{product.price}</p>
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700" 
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
