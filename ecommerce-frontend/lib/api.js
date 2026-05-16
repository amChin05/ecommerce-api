// lib/api.js
const API_URL = 'https://ecommerce-api-five-rouge.vercel.app/api';

export const fetchAPI = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};
