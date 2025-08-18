🛒 FLI Super - The Supermarket Web Application

Welcome to FLI Super, a modern and feature-rich supermarket web application designed to provide users with a seamless grocery shopping experience. From browsing products to making secure payments, FLI Super delivers a complete e-commerce solution for supermarkets.

✨ Features

🔎 Product Browsing – Explore a wide range of products across multiple categories.

🛒 Shopping Cart – Add products, update quantities, and remove items before checkout.

💳 Secure Checkout – Smooth checkout with integrated payment gateway (Stripe).

👤 User Accounts & Profiles – Create and manage accounts for a personalized shopping experience.

📦 Order Management – View order history, track purchases, and re-order items.

🔐 JWT Authentication – Secure login and registration with Spring Security & JWT (JSON Web Tokens).

🎟️ Discounts & Promo Codes – Apply discount coupons during checkout for reduced prices.

🔍 Search & Filter – Quickly find products with advanced search and category filters.

📊 Admin Dashboard – Manage products, categories, orders, users, and discounts.

📱 Responsive UI – Optimized for desktop and mobile devices.

🏗️ Technologies Used

Frontend

React.js

HTML5, CSS3, JavaScript (ES6+)

Axios (API communication)

Backend

Java, Spring Boot

Spring Security + JWT Authentication

RESTful APIs

Database

MySQL (Relational Database)

JPA / Hibernate ORM

Authentication & Authorization

JWT-based Authentication

Role-based Access Control (User & Admin roles)

Payments & Discounts

Stripe Payment Gateway Integration

Discount & Promo Code Engine

Deployment

Docker & Docker Compose

(Optional: Kubernetes / AWS / GCP for cloud deployment)

🚀 Installation
1️⃣ Clone the Repository
git clone https://github.com/SLIIT-FacultyOfComputing/se-group-project-group-3-fli-super-supermarket-app.git
cd se-group-project-group-3-fli-super-supermarket-app

2️⃣ Backend Setup (Spring Boot)
cd backend
mvn clean install
mvn spring-boot:run


Backend will run at: http://localhost:8080

3️⃣ Frontend Setup (React)
cd frontend
npm install
npm start


Frontend will run at: http://localhost:3000

🔐 Authentication (JWT Flow)

Register/Login → User provides email & password.

Token Generation → On successful login, backend generates a JWT token.

Secure API Calls → Token is included in headers (Authorization: Bearer <token>) for protected routes.

Role-based Access – Admin has elevated privileges (manage products, orders, discounts).

🛍️ Usage

Homepage – Browse featured categories & products.

Product Page – View detailed information, stock, and reviews.

Cart – Add/remove items, apply discounts, and view total.

Checkout – Enter details & pay securely using Stripe.

User Dashboard – Manage profile, view order history, track status.

Admin Panel – Add/update/delete products, view orders, manage users & discounts.

🤝 Contributing

We welcome contributions!

Fork the repository

Create a feature branch

git checkout -b feature/your-feature-name


Commit your changes

git commit -m "Added a new feature"


Push to your branch

git push origin feature/your-feature-name


Open a Pull Request

📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

✅ With FLI Super, grocery shopping is faster, easier, and smarter.
