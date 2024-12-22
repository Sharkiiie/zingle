import React, { useState, useEffect } from 'react';

import { i18n } from 'i18next';
import { useHistory, useLocation } from 'react-router-dom';
// import ThemeSwitchProvider from './ThemeSwitchProvider';
import { RecoilRoot } from 'recoil';
import { useNuiEvent } from './hooks/useNuiEvent';
import Header from './components/header';
import Numpad from './components/numpad';
import ActivityPage from './components/activity-page';
import BottomTabs from './components/bottom-tabs';
import { Transaction } from './types';
import fetchNui from './utils/fetchNui';
import { ServerPromiseResp } from './types/common';
import { Button } from "@/components/ui/button";
import SendRequestDialog from './components/SendRequestDialog';

const paymentRequests: Transaction[] = [
  { id: 5, name: 'Charlie Green', type: 'sent', amount: 30, date: new Date('2023-06-16T12:00:00') },
];

const transactions: Transaction[] = [
  { id: 1, name: 'John Doe', type: 'sent', amount: 50, date: new Date('2023-06-15T10:30:00') },
  // { id: 2, name: 'Jane Smith', type: 'received', amount: 25, date: new Date('2023-06-14T15:45:00') },
  // { id: 3, name: 'Bob Johnson', type: 'sent', amount: 75, date: new Date('2023-06-13T09:15:00') },
  // { id: 4, name: 'Alice Brown', type: 'received', amount: 100, date: new Date('2023-06-12T18:20:00') },
  // { id: 5, name: 'Alice Brown', type: 'received', amount: 100, date: new Date('2023-06-12T18:20:00') },
  // { id: 6, name: 'John Smith', type: 'sent', amount: 250, date: new Date('2023-06-13T14:45:00') },
  // { id: 7, name: 'Emma Johnson', type: 'received', amount: 75, date: new Date('2023-06-14T09:30:00') },
  // { id: 8, name: 'Michael Davis', type: 'sent', amount: 300, date: new Date('2023-06-15T11:15:00') },
  // { id: 9, name: 'Sophia Martinez', type: 'received', amount: 120, date: new Date('2023-06-16T16:00:00') },
  // { id: 10, name: 'Liam Wilson', type: 'sent', amount: 180, date: new Date('2023-06-17T10:50:00') },
  // { id: 11, name: 'Olivia Thomas', type: 'received', amount: 95, date: new Date('2023-06-18T19:25:00') },
  // { id: 12, name: 'Ethan Garcia', type: 'sent', amount: 400, date: new Date('2023-06-19T13:35:00') },
  // { id: 13, name: 'Isabella Anderson', type: 'received', amount: 150, date: new Date('2023-06-20T17:40:00') },
  // { id: 14, name: 'Noah Taylor', type: 'sent', amount: 220, date: new Date('2023-06-21T08:30:00') },
  // { id: 15, name: 'Ava Moore', type: 'received', amount: 85, date: new Date('2023-06-22T12:20:00') },
];

interface AppProps {
  // theme: Theme;
  i18n: i18n;
  settings: any;
}


export function App(props: AppProps) {
  const history = useHistory();
  const { pathname } = useLocation();
  const [nuiData, setNuiData] = useState(null);
  const [balance, setBalance] = useState<number>(1234); // Example balance
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState<'send' | 'request'>('send');
  const [numpadValue, setNumpadValue] = useState('0');

  // TODO: Use state instead of dummy data
  // const [transactions, setTransactions] = useState<Transaction[] | undefined>([]);
  // const [paymentRequests, setPaymentRequests] = useState<Transaction[] | undefined>([]);


  const formatBalance = (balance: number) => {
    return balance.toLocaleString();
  };

  const [page, setPage] = useState(pathname);

  useNuiEvent('ZINGLE', 'setRandomData', (data) => {
    console.log(data);
    setNuiData(data);
  });

  useNuiEvent('ZINGLE', 'npwd:zingle:updateBalance', (data) => {
    console.log(data);
    setBalance(data);
  });

  useNuiEvent('ZINGLE', 'npwd:zingle:updateTransactions', (data) => {
    console.log(data);
    setTransactions(data);
  });

  useNuiEvent('ZINGLE', 'npwd:zingle:updatePaymentReq', (data) => {
    console.log(data);
    setPaymentRequests(data);
  });

  useEffect(() => {
    // setPaymentRequests(paymentRequests);
    fetchNui<ServerPromiseResp<number>>("npwd:zingle:getBalance").then(
      (resp) => {
        setBalance(resp.data ?? 0);
      }
    );
    fetchNui<ServerPromiseResp<Transaction[]>>("npwd:zingle:getTransactions").then(
      (resp) => {
        setTransactions(resp.data);
      }
    );
    fetchNui<ServerPromiseResp<Transaction[]>>("npwd:zingle:getPaymentRequests").then(
      (resp) => {
        setPaymentRequests(resp.data);
      }
    );
  }, []);

  const [activeTab, setActiveTab] = useState('home');

  const handleSendRequest = (context: 'send' | 'request') => {
    if (numpadValue === '0') return;
    setDialogContext(context);
    setIsDialogOpen(true);
  };

  const handleResetNumpad = () => {
    setNumpadValue('0');
  };

  return (
    <div className="!important flex flex-col h-screen bg-gray-900 text-white">
      <Header balance={formatBalance(balance)} />
      <main className="flex-1 flex flex-col items-center justify-between p-4 overflow-y-auto relative">
        {activeTab === 'home' ? (
          <>
            <Numpad displayValue value={numpadValue} onValueChange={setNumpadValue} />
            <div className="w-full max-w-md space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => handleSendRequest('send')} variant="primary" className="h-14 bg-green-500 text-white py-3 rounded-full font-semibold text-lg">
                  Send
                </Button>
                <Button onClick={() => handleSendRequest('request')} variant="primary" className="h-14 bg-white text-black py-3 rounded-full font-semibold text-lg">
                  Request
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ActivityPage paymentRequests={paymentRequests || []} transactions={transactions || []} />
        )}
        <SendRequestDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} context={dialogContext} amount={numpadValue} onResetNumpad={handleResetNumpad} />
      </main>
      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} paymentRequests={paymentRequests || []} />
    </div>
  );
}

export default function WithProviders(props: AppProps) {
  return (
    <RecoilRoot override key="zingle">
      <App {...props} />
    </RecoilRoot>
  );
}
