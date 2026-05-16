E-Commerce API Reference
Base URL: https://ecommerce-api-five-rouge.vercel.app

=== CUSTOMERS ===
GET /api/customers
Description: ดึงข้อมูลลูกค้าทั้งหมดในระบบ

HTTP Status Code: 200 OK, 500 Internal Server Error

Response Example:

JSON
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-05-17T04:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "created_at": "2026-05-17T04:05:00.000Z"
  }
]
GET /api/customers/:id
Description: ดึงข้อมูลลูกค้า 1 รายการ ตาม ID ที่ระบุ

HTTP Status Code: 200 OK, 404 Not Found, 500 Internal Server Error

Response Example:

JSON
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-05-17T04:00:00.000Z"
}
POST /api/customers
Description: สร้างข้อมูลลูกค้าใหม่

HTTP Status Code: 201 Created, 500 Internal Server Error

Request Body:

JSON
{
  "name": "Alice Brown",
  "email": "alice@example.com"
}
Response Example:

JSON
{
  "id": 3,
  "name": "Alice Brown",
  "email": "alice@example.com"
}
DELETE /api/customers/:id
Description: ลบข้อมูลลูกค้า ตาม ID ที่ระบุ

HTTP Status Code: 200 OK, 404 Not Found, 500 Internal Server Error

Response Example:

JSON
{
  "message": "Customer deleted successfully"
}
=== PRODUCTS ===
GET /api/products
Description: ดึงข้อมูลสินค้าทั้งหมด

HTTP Status Code: 200 OK, 500 Internal Server Error

Response Example:

JSON
[
  {
    "id": 1,
    "name": "Laptop",
    "price": "25000.00",
    "stock": 10,
    "created_at": "2026-05-17T04:00:00.000Z"
  }
]
GET /api/products/:id
Description: ดึงข้อมูลสินค้า 1 รายการ ตาม ID ที่ระบุ

HTTP Status Code: 200 OK, 404 Not Found, 500 Internal Server Error

Response Example:

JSON
{
  "id": 1,
  "name": "Laptop",
  "price": "25000.00",
  "stock": 10,
  "created_at": "2026-05-17T04:00:00.000Z"
}
POST /api/products
Description: เพิ่มข้อมูลสินค้าใหม่

HTTP Status Code: 201 Created, 500 Internal Server Error

Request Body:

JSON
{
  "name": "New Smartphone",
  "price": 15000.00,
  "stock": 20
}
Response Example:

JSON
{
  "id": 4,
  "name": "New Smartphone",
  "price": 15000.00,
  "stock": 20
}
DELETE /api/products/:id
Description: ลบข้อมูลสินค้า ตาม ID ที่ระบุ

HTTP Status Code: 200 OK, 404 Not Found, 500 Internal Server Error

Response Example:

JSON
{
  "message": "Product deleted successfully"
}
=== ORDERS ===
GET /api/orders
Description: ดึงข้อมูลคำสั่งซื้อทั้งหมด

HTTP Status Code: 200 OK, 500 Internal Server Error

Response Example:

JSON
[
  {
    "id": 1,
    "customer_id": 1,
    "total": "26000.00",
    "status": "pending",
    "created_at": "2026-05-17T04:10:00.000Z"
  }
]
GET /api/orders/:id
Description: ดึงข้อมูลคำสั่งซื้อ 1 รายการ ตาม ID ที่ระบุ

HTTP Status Code: 200 OK, 404 Not Found, 500 Internal Server Error

Response Example:

JSON
{
  "id": 1,
  "customer_id": 1,
  "total": "26000.00",
  "status": "pending",
  "created_at": "2026-05-17T04:10:00.000Z"
}
POST /api/orders
Description: สร้างคำสั่งซื้อใหม่ (ระบบจะคำนวณราคารวมให้อัตโนมัติและตัดสต๊อกสินค้าทันที)

HTTP Status Code: 201 Created, 500 Internal Server Error

Request Body:

JSON
{
  "customer_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 1
    },
    {
      "product_id": 2,
      "quantity": 2
    }
  ]
}
Response Example:

JSON
{
  "message": "Order created successfully",
  "order_id": 1,
  "total": 26000.00
}
DELETE /api/orders/:id
Description: ลบข้อมูลคำสั่งซื้อ ตาม ID ที่ระบุ (จะลบข้อมูล order_items ที่เกี่ยวข้องด้วย)

HTTP Status Code: 200 OK, 404 Not Found, 500 Internal Server Error

Response Example:

JSON
{
  "message": "Order deleted successfully"
}