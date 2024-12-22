import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface SendRequestDialogProps {
    isOpen: boolean;
    onClose: () => void;
    context: 'send' | 'request';
    amount: string;
    onResetNumpad: () => void;
}

const formatter = new Intl.NumberFormat('en-US');

export default function SendRequestDialog({ isOpen, onClose, context, amount, onResetNumpad }: SendRequestDialogProps) {
    const [inputValue, setInputValue] = useState('');
    const [hasError, setHasError] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setInputValue('');
        setHasError(false);
        onResetNumpad();
        onClose();
    };

    const handleConfirm = () => {
        if (!inputValue.trim() || isNaN(Number(inputValue))) {
            setHasError(true);
            return;
        }
        // Handle the confirm action here
        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() && !isNaN(Number(value))) {
            setHasError(false);
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-gray-900 text-white text-xl border-none p-6 rounded-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{context === 'send' ? `Send $${formatter.format(parseInt(amount))} to` : `Request $${formatter.format(parseInt(amount))} from`}</h2>
                    {/* <button onClick={handleClose} className="text-white text-xl font-bold">&times;</button> */}
                </div>
                <input
                    type="text"
                    placeholder="ID"
                    value={inputValue}
                    onChange={handleChange}
                    className={`w-full p-2 border ${hasError ? 'border-red-500' : 'border-gray-900'} rounded-2xl bg-gray-700 text-white focus:ring ${hasError ? 'focus:ring-red-500' : 'focus:ring-gray-700'} focus:outline-none mb-4`}
                />
                <div className="flex justify-end space-x-2">
                    <Button onClick={handleClose} variant="destructive" className="bg-red-500 text-white font-bold rounded-full">Cancel</Button>
                    <Button onClick={handleConfirm} variant="default" className="bg-green-500 text-white font-bold hover:bg-green-600 rounded-full">Confirm</Button>
                </div>
            </div>
        </div>
    );
}
