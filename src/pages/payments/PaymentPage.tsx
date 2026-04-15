import React, { useState } from "react";
import { usePayments } from "../../context/PaymentContext";

export const PaymentPage = () => {
  const { balance, deposit, withdraw, transfer, transactions } = usePayments();

  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">💳 Payments</h2>

      {/* Balance */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">Wallet Balance</h3>
        <p className="text-2xl font-bold text-green-600">${balance}</p>
      </div>

      {/* Actions */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded w-full"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <input
          type="text"
          placeholder="Receiver (for transfer)"
          className="border p-2 rounded w-full"
          onChange={(e) => setReceiver(e.target.value)}
        />

        <div className="flex gap-2">
          <button onClick={() => deposit(amount)} className="bg-green-600 text-white px-3 py-1 rounded">
            Deposit
          </button>

          <button onClick={() => withdraw(amount)} className="bg-red-600 text-white px-3 py-1 rounded">
            Withdraw
          </button>

          <button onClick={() => transfer(amount, receiver)} className="bg-blue-600 text-white px-3 py-1 rounded">
            Transfer
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Transaction History</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Amount</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>${t.amount}</td>
                <td>{t.sender}</td>
                <td>{t.receiver}</td>
                <td className="text-green-600">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};