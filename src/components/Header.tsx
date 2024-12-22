import { CreditCard } from 'lucide-react'
import React from 'react'

interface HeaderProps {
    balance: string;
}

export default function Header({ balance }: HeaderProps) {
    return (
        <header className="flex justify-between items-center p-4 mx-2">
            <h1 className="text-2xl font-bold">Zingle</h1>
            <div className="text-sm flex gap-2 font-semibold items-center"><CreditCard /> ${balance}</div>
        </header>
    )
}

