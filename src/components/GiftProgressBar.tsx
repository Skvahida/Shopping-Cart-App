
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface GiftProgressBarProps {
  currentAmount: number;
  threshold: number;
  isGiftAdded: boolean;
}

const GiftProgressBar: React.FC<GiftProgressBarProps> = ({ 
  currentAmount, 
  threshold,
  isGiftAdded
}) => {
  const progressPercentage = Math.min((currentAmount / threshold) * 100, 100);
  const remainingAmount = Math.max(threshold - currentAmount, 0);

  return (
    <div className="py-3 px-4 bg-blue-50 rounded-md mb-4">
      {isGiftAdded ? (
        <p className="text-sm mb-1">You get a free Wireless Mouse!</p>
      ) : (
        <p className="text-sm mb-1">Add ₹{remainingAmount} more to get a FREE Wireless Mouse!</p>
      )}
      {!isGiftAdded && (
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-gray-200"
        />
      )}
    </div>
  );
};

export default GiftProgressBar;
