'use client';
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAPI('/orders');
      setOrders(data);
    };
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b">
                <td className="p-4">#{o.id}</td>
                <td className="p-4">{o.customer_id}</td>
                <td className="p-4">{o.total} ฿</td>
                <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
