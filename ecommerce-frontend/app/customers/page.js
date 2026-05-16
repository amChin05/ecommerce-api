'use client';
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const loadData = async () => {
    try {
      const data = await fetchAPI('/customers');
      setCustomers(data);
    } catch (error) {
      alert("Error loading customers");
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchAPI('/customers', {
        method: 'POST',
        body: JSON.stringify({ name, email }),
      });
      setName('');
      setEmail('');
      loadData();
    } catch (error) {
      alert("Failed to add customer");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Customers</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border mb-8 flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="border p-2 rounded w-64 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border p-2 rounded w-64 text-black" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Customer</button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="border-b">
                <td className="p-4">{c.id}</td>
                <td className="p-4">{c.name}</td>
                <td className="p-4">{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
