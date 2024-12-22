import { ArrowUpRight, ArrowDownLeft, Check, X } from 'lucide-react'
import React from 'react'
import { Transaction, ActivityPageProps } from '../types'

export default function ActivityPage({ paymentRequests, transactions }: ActivityPageProps) {
    return (
        <div className="w-full max-w-md mx-auto p-4 h-[625px] overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold mb-4">Activity</h2>
            {paymentRequests.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Payment Requests</h3>
                    <ul className="space-y-4">
                        {paymentRequests.map((request) => (
                            <li key={request.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <ArrowUpRight className="text-red-500 mr-2" />
                                    <div>
                                        <p className="font-semibold">{request.name}</p>
                                        <p className="text-sm text-gray-400 mb-2">is requesting ${request.amount.toFixed(0)} from you</p>
                                        <p className="text-sm text-gray-400">
                                            {request.date.toLocaleDateString()} {request.date.toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="bg-green-500 text-white p-2 rounded-full">
                                        <Check size={16} />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-full">
                                        <X size={16} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <h3 className="text-xl font-semibold mb-2">Transactions</h3>
            <ul className="space-y-4">
                {transactions.length === 0 && <p className="text-gray-400">No transactions yet :(</p>}
                {transactions.map((transaction) => (
                    <li key={transaction.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center">
                            {transaction.type === 'sent' ? (
                                <ArrowUpRight className="text-red-500 mr-2" />
                            ) : (
                                <ArrowDownLeft className="text-green-500 mr-2" />
                            )}
                            <div>
                                <p className="font-semibold">{transaction.name}</p>
                                <p className="text-sm text-gray-400">
                                    {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                        <p className={`font-bold ${transaction.type === 'sent' ? 'text-red-500' : 'text-green-500'}`}>
                            ${transaction.amount.toFixed(0)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
