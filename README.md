# Moffat Bay Lodge - Hotel Reservation System

A full-stack hotel reservation management system built with React and Spring Boot, featuring user authentication, room booking, and administrative capabilities.

## 🌐 Live Demo

**Frontend**: [https://moffatbay.web.app/](https://moffatbay.web.app/)  
**Backend API**: [https://moffat-bay-mksq.onrender.com](https://moffat-bay-mksq.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Guest Features
- **Landing Page**: Attractive hotel showcase with features and statistics
- **Room Browsing**: View available rooms with detailed information
- **Availability Search**: Check room availability by date and guest count
- **User Registration & Login**: Secure authentication system
- **Reservation Booking**: Complete booking flow with confirmation
- **Contact Form**: Direct communication with hotel management
- **Attractions Page**: Local attractions and activities information

### User Features
- **My Reservations**: View and manage personal bookings
- **Profile Management**: Update personal information
- **Booking History**: Track past and upcoming reservations

### Admin Features
- **Admin Search**: Advanced reservation search and management
- **User Management**: Admin-level user operations
- **Reservation Management**: Full CRUD operations on bookings

## 🛠 Technology Stack

### Frontend
- **React 19.1.1** - UI framework
- **React Router DOM 7.8.2** - Client-side routing
- **Axios 1.7.7** - HTTP client
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Firebase Hosting** - Deployment platform

### Backend
- **Spring Boot 3.5.5** - Java framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **MySQL** - Database (Aiven Cloud)
- **JWT (JJWT 0.11.5)** - Token-based authentication
- **Maven** - Dependency management
- **Docker** - Containerization
- **Render** - Cloud deployment

### Development Tools
- **Java 21** - Programming language
- **Node.js** - JavaScript runtime
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 📁 Project Structure

```
Moffat-Bay/
├── frontend/                   # React application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Footer.js
│   │   │   └── Navbar.js
│   │   ├── pages/            # Page components
│   │   │   ├── LandingPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── AvailabilityPage.js
│   │   │   ├── BookingDetailsPage.js
│   │   │   ├── ConfirmationPage.js
│   │   │   ├── MyReservationsPage.js
│   │   │   ├── ContactUsPage.js
│   │   │   ├── Attractions.js
│   │   │   ├── AboutUs.js
│   │   │   └── AdminSearchPage.js
│   │   ├── services/         # API service layer
│   │   │   └── apiService.js
│   │   └── App.js           # Main application component
│   ├── firebase.json        # Firebase hosting configuration
│   └── package.json
├── backend/
│   └── moffat-bay/          # Spring Boot application
│       ├── src/main/java/com/group2/moffat_bay/
│       │   ├── MoffatBayApplication.java    # Main application class
│       │   ├── config/                      # Configuration classes
│       │   │   ├── DataInitializer.java
│       │   │   └── SecurityConfig.java
│       │   ├── controller/                  # REST controllers
│       │   │   ├── AuthController.java
│       │   │   ├── ContactController.java
│       │   │   ├── LandingController.java
│       │   │   ├── ReservationController.java
│       │   │   └── RoomController.java
│       │   ├── dto/                        # Data Transfer Objects
│       │   ├── model/                      # JPA entities
│       │   │   ├── User.java
│       │   │   ├── Room.java
│       │   │   ├── Reservation.java
│       │   │   └── ContactMessage.java
│       │   ├── repository/                 # Data repositories
│       │   ├── service/                    # Business logic
│       │   └── util/                       # Utility classes
│       ├── src/main/resources/
│       │   └── application.properties      # Application configuration
│       ├── Dockerfile                      # Docker configuration
│       └── pom.xml                        # Maven dependencies
└── sql.sql                                # Database schema
```

## 🚀 Getting Started

### Prerequisites

- **Java 21** or higher
- **Node.js 18** or higher
- **Maven 3.6** or higher
- **MySQL 8.0** or higher

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nmemarcoding/Moffat-Bay.git
   cd Moffat-Bay/backend/moffat-bay
   ```

2. **Configure Database**
   - Create MySQL database using `sql.sql`
   - Update `application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/moffat_lodge
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL**
   Create `.env.local` file:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   The frontend will start on `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/check-token` - Token validation

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/available` - Get available rooms by date and guests

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/me` - Get user's reservations

### Landing Page
- `GET /api/landing/info` - Get hotel information
- `GET /api/landing/stats` - Get hotel statistics

### Contact
- `POST /api/contact` - Submit contact form

### Health Check
- `GET /api/ping` - Server health check

## 🗄 Database Schema

### Tables

**Users Table**
- `user_id` (Primary Key, Auto Increment)
- `email` (Unique, Not Null)
- `password` (BCrypt Hash)
- `first_name`, `last_name`
- `telephone`
- `is_admin` (Boolean, Default: false)

**Rooms Table**
- `room_id` (Primary Key, Auto Increment)
- `room_number` (Unique)
- `bed_type`
- `price_per_night` (Decimal)
- `max_guests`

**Reservations Table**
- `reservation_id` (Primary Key, Auto Increment)
- `user_id` (Foreign Key → Users)
- `room_id` (Foreign Key → Rooms)
- `guests`
- `check_in`, `check_out` (Dates)

## 🚀 Deployment

### Frontend (Firebase)
```bash
cd frontend
npm run build
firebase deploy
```

### Backend (Render/Docker)
The backend is containerized using Docker and deployed on Render platform.

**Dockerfile Features:**
- Multi-stage build for optimization
- Maven build with Java 21
- Alpine Linux runtime for smaller image size
- Exposes port 8080

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt hashing for user passwords
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Jakarta Bean Validation on all inputs
- **SQL Injection Protection**: JPA/Hibernate parameterized queries

## 🧪 Testing

### Backend Tests
```bash
cd backend/moffat-bay
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🌟 Key Features Implementation

### Real-time Availability Check
The system checks room availability in real-time by querying existing reservations and filtering out occupied rooms for the requested dates.

### Responsive Design
Built with Tailwind CSS for mobile-first, responsive design that works seamlessly across all devices.

### Error Handling
Comprehensive error handling on both frontend and backend with user-friendly error messages.

### Token Management
Automatic token refresh and secure storage with proper cleanup on logout.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 📞 Support

For support and questions, please use the contact form on the website or submit an issue on GitHub.

---

