import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'E-Commerce Admin',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-black">
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex gap-6 font-bold">
            <Link href="/" className="hover:text-blue-200">Dashboard</Link>
            <Link href="/customers" className="hover:text-blue-200">Customers</Link>
            <Link href="/products" className="hover:text-blue-200">Products</Link>
            <Link href="/orders" className="hover:text-blue-200">Orders</Link>
          </div>
        </nav>
        <main className="container mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
