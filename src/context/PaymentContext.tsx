import React, { createContext, useContext, useState } from "react";

interface Transaction {
  amount: number;
  sender: string;
  receiver: string;
  status: string;
}

interface PaymentContextType {
  balance: number;
  transactions: Transaction[];
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  transfer: (amount: number, receiver: string) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const deposit = (amount: number) => {
    setBalance(prev => prev + amount);
    setTransactions(prev => [
      ...prev,
      { amount, sender: "You", receiver: "Wallet", status: "Success" }
    ]);
  };

  const withdraw = (amount: number) => {
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      ...prev,
      { amount, sender: "Wallet", receiver: "You", status: "Success" }
    ]);
  };

  const transfer = (amount: number, receiver: string) => {
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      ...prev,
      { amount, sender: "You", receiver, status: "Success" }
    ]);
  };

  return (
    <PaymentContext.Provider value={{ balance, transactions, deposit, withdraw, transfer }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error("usePayments must be used inside PaymentProvider");
  return context;
};