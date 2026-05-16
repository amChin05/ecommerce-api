'use client';
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const loadData = async () => {
    const data = await fetchAPI('/products');
    setProducts(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchAPI('/products', {
      method: 'POST',
      body: JSON.stringify({ name, price: Number(price), stock: Number(stock) }),
    });
    setName(''); setPrice(''); setStock('');
    loadData();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border mb-8 flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="border p-2 rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="border p-2 rounded w-32 text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} required className="border p-2 rounded w-32 text-black" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Product</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-4">{p.id}</td>
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.price}</td>
                <td className="p-4">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
