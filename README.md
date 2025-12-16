<div align="center">

# 🛒 FLI Super - Modern Supermarket Web Application

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Storage-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

**The ultimate supermarket web application designed to enhance your grocery shopping experience.**

[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Installation](#-installation) •
[Usage](#-usage) •
[Contributing](#-contributing)

</div>

---

## 📋 About

FLI Super is a full-stack e-commerce web application built for modern grocery shopping. It provides a seamless experience for browsing products, managing shopping carts, and completing secure checkouts. The application features a robust admin panel for inventory management, promotions, and order tracking.

## ✨ Features

### Customer Features
- 🛍️ **Product Browsing** - Explore a wide range of products across multiple categories
- 🛒 **Smart Shopping Cart** - Add, update, and manage cart items with real-time calculations
- 💳 **Secure Checkout** - Fast and secure payment processing
- 👤 **User Accounts** - Personalized experience with profile management
- 📦 **Order History** - Track past orders and easily reorder items
- 🔍 **Advanced Search** - Quickly find products with intelligent search functionality
- 🎟️ **Promo Codes** - Apply discount codes during checkout

### Admin Features
- 📊 **Admin Dashboard** - Comprehensive overview of store performance
- 📦 **Product Management** - Add, update, and delete products with image uploads
- 🎉 **Promotion Management** - Create and manage promotional campaigns
- 📋 **Order Management** - View and process customer orders
- 👥 **User Management** - Admin registration and role management

## 🚀 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-7.4.1-CA4245?style=flat-square&logo=react-router&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)

### Backend
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=flat-square&logo=spring&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-0.11.5-000000?style=flat-square&logo=json-web-tokens&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat-square&logo=apache-maven&logoColor=white)
![Lombok](https://img.shields.io/badge/Lombok-1.18.30-BC4521?style=flat-square&logo=lombok&logoColor=white)

### Database & Cloud
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Google Cloud Storage](https://img.shields.io/badge/Google%20Cloud%20Storage-4285F4?style=flat-square&logo=google-cloud&logoColor=white)
![Cloud SQL](https://img.shields.io/badge/Cloud%20SQL-4285F4?style=flat-square&logo=google-cloud&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Cloud Build](https://img.shields.io/badge/Cloud%20Build-4285F4?style=flat-square&logo=google-cloud&logoColor=white)

## 📦 Installation

### Prerequisites
- **Java 21** or higher
- **Node.js 18+** and npm
- **Docker** and Docker Compose
- **MySQL 8.0+** (or use Cloud SQL via Docker)
- **Google Cloud Service Account** (for Cloud Storage)

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SLIIT-FacultyOfComputing/se-group-project-group-3-fli-super-supermarket-app.git
   cd se-group-project-group-3-fli-super-supermarket-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   # Configure application.properties with your database credentials
   # Add service-account-key.json for Google Cloud Storage
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will start on `http://localhost:3000`

### Docker Deployment

1. **Configure Service Account**
   - Place your `service-account-key.json` in the root directory

2. **Start All Services**
   ```bash
   docker-compose up --build
   ```
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`
   - MySQL via Cloud SQL Proxy: `localhost:3307`

3. **Stop Services**
   ```bash
   docker-compose down
   ```

## 🎯 Usage

### For Customers
1. **Browse Products** - Navigate to the homepage and explore products by category
2. **Add to Cart** - Click on products and add them to your shopping cart
3. **Register/Login** - Create an account or sign in to access personalized features
4. **Checkout** - Review your cart, apply promo codes, and complete your purchase
5. **Track Orders** - View your order history and track delivery status

### For Administrators
1. **Admin Login** - Access the admin panel with administrator credentials
2. **Manage Products** - Add new products, update existing ones, or remove items
3. **Create Promotions** - Set up promotional campaigns and discount codes
4. **Process Orders** - View and manage customer orders
5. **Monitor Dashboard** - Track sales, popular products, and store analytics

### API Endpoints
- **Products**: `GET/POST/PUT/DELETE /api/products`
- **Cart**: `GET/POST /api/cart`
- **Orders**: `GET/POST /api/orders`
- **Auth**: `POST /api/auth/login`, `POST /api/auth/register`
- **Promo Codes**: `GET/POST /api/promocodes`

## 🏗️ Project Structure

```
se-group-project-group-3-fli-super-supermarket-app/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/         # Java source code
│   ├── src/main/resources/    # Configuration files
│   ├── pom.xml                # Maven dependencies
│   └── Dockerfile             # Backend container config
├── frontend/                   # React frontend
│   ├── public/                # Static assets
│   ├── src/                   # React components
│   ├── package.json           # npm dependencies
│   └── Dockerfile             # Frontend container config
├── docker-compose.yml         # Multi-container setup
└── cloudbuild.yaml            # GCP Cloud Build config
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/se-group-project-group-3-fli-super-supermarket-app.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Coding Standards
- Follow Java naming conventions for backend code
- Use ESLint for frontend code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed by **Group 3** as part of the Software Engineering module (SE2072) at SLIIT.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Group 3

</div>

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PNXcjgcR)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18535457)
