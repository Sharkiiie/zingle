import { Home, Clock } from 'lucide-react'
import React from 'react'
import { BottomTabsProps } from '../types'

export default function BottomTabs({ activeTab, onTabChange, paymentRequests }: BottomTabsProps) {
    return (
        <div className="flex justify-around items-center bg-gray-900 p-4">
            <button
                onClick={() => onTabChange('home')}
                className={`flex flex-col items-center ${activeTab === 'home' ? 'text-white' : 'text-gray-400'}`}
            >
                <Home size={24} />
                <span className="text-xs mt-1">Home</span>
            </button>
            <button
                onClick={() => onTabChange('activity')}
                className={`flex flex-col items-center relative ${activeTab === 'activity' ? 'text-white' : 'text-gray-400'}`}
            >
                <Clock size={24} />
                <span className="text-xs mt-1">Activity</span>
                {paymentRequests.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
            </button>
        </div>
    )
}