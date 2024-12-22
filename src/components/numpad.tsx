import React from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

const formatter = new Intl.NumberFormat('en-US');
const bal = 1234;

interface NumpadProps {
  displayValue?: boolean;
  value: string;
  onValueChange: (value: string) => void;
}

export default function Numpad({ displayValue = false, value, onValueChange }: NumpadProps) {
  const handleClick = (digit: string) => {
    onValueChange(prevValue => {
      const newValue = prevValue === '0' ? digit : prevValue + digit;
      const numericValue = parseInt(newValue);
      const numericBal = bal;

      if (numericValue > numericBal) {
        return bal.toString();
      } else if (newValue.length > 5) {
        return prevValue;
      } else {
        return newValue;
      }
    });
  };

  const handleClear = () => {
    onValueChange('0');
  };

  const handleDelete = () => {
    onValueChange(prevValue => {
      if (prevValue.length === 1) {
        return '0';
      }
      return prevValue.slice(0, -1);
    });
  };

  return (
    <div className="!important w-full max-w-xs pt-12">
      {displayValue && <div className="text-6xl font-bold text-center mb-8">${formatter.format(parseInt(value))}</div>}
      <div className="!important grid grid-cols-3 gap-4 pt-16">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <Button
            key={num}
            onClick={() => handleClick(num.toString())}
            variant="ghost"
            className="h-16 text-2xl flex items-center justify-center hover:bg-transparent hover:scale-150 hover:text-inherit"
          >
            {num}
          </Button>
        ))}
        <Button onClick={handleClear} variant="ghost" className="h-16 text-xl flex items-center justify-center hover:bg-transparent hover:scale-150 hover:text-inherit">
          <X size={32} />
        </Button>
        <Button onClick={() => handleClick('0')} variant="ghost" className="h-16 text-2xl flex items-center justify-center hover:bg-transparent hover:scale-150 hover:text-inherit">
          0
        </Button>
        <Button onClick={handleDelete} variant="ghost" className="h-16 text-xl flex items-center justify-center hover:bg-transparent hover:scale-150 hover:text-inherit">
          <ChevronLeft size={32} />
        </Button>
      </div>
    </div>
  );
}