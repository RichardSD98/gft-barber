#!/bin/bash

# GFT BARBER - Project Structure Setup Script
# This script creates all necessary directories and files for the MERN stack barber booking platform

set -e

echo "🏗️  Creating GFT BARBER project structure..."

# Frontend - Pages (Public)
echo "📄 Creating public pages..."
mkdir -p src/app/\(public\)/home
mkdir -p src/app/\(public\)/about
mkdir -p src/app/\(public\)/services
mkdir -p src/app/\(public\)/booking
mkdir -p src/app/\(public\)/contact
mkdir -p src/app/\(public\)/reviews

touch src/app/\(public\)/home/page.tsx
touch src/app/\(public\)/about/page.tsx
touch src/app/\(public\)/services/page.tsx
touch src/app/\(public\)/booking/page.tsx
touch src/app/\(public\)/contact/page.tsx
touch src/app/\(public\)/reviews/page.tsx

# Frontend - Pages (Admin)
echo "🔐 Creating admin pages..."
mkdir -p src/app/\(admin\)/dashboard
mkdir -p src/app/\(admin\)/bookings
mkdir -p src/app/\(admin\)/services
mkdir -p src/app/\(admin\)/staff
mkdir -p src/app/\(admin\)/analytics

touch src/app/\(admin\)/dashboard/page.tsx
touch src/app/\(admin\)/bookings/page.tsx
touch src/app/\(admin\)/services/page.tsx
touch src/app/\(admin\)/staff/page.tsx
touch src/app/\(admin\)/analytics/page.tsx

# Frontend - API Routes
echo "🔌 Creating API routes..."
mkdir -p src/app/api/auth
mkdir -p src/app/api/bookings
mkdir -p src/app/api/services
mkdir -p src/app/api/users
mkdir -p src/app/api/reviews

touch src/app/api/auth/route.ts
touch src/app/api/bookings/route.ts
touch src/app/api/services/route.ts
touch src/app/api/users/route.ts
touch src/app/api/reviews/route.ts

# Frontend - UI Components
echo "🎨 Creating UI components..."
mkdir -p src/components/ui

touch src/components/ui/Button.tsx
touch src/components/ui/Card.tsx
touch src/components/ui/Badge.tsx
touch src/components/ui/Input.tsx
touch src/components/ui/Modal.tsx
touch src/components/ui/Spinner.tsx
touch src/components/ui/index.ts

# Frontend - Layout Components
echo "📐 Creating layout components..."
mkdir -p src/components/layout

touch src/components/layout/Navbar.tsx
touch src/components/layout/Footer.tsx
touch src/components/layout/MobileMenu.tsx
touch src/components/layout/index.ts

# Frontend - Booking Components
echo "📅 Creating booking components..."
mkdir -p src/components/booking

touch src/components/booking/BookingSteps.tsx
touch src/components/booking/ServiceCard.tsx
touch src/components/booking/DatePicker.tsx
touch src/components/booking/TimePicker.tsx
touch src/components/booking/index.ts

# Frontend - Admin Components
echo "⚙️  Creating admin components..."
mkdir -p src/components/admin

touch src/components/admin/Sidebar.tsx
touch src/components/admin/BookingTable.tsx
touch src/components/admin/MetricCard.tsx
touch src/components/admin/index.ts

# Frontend - Library
echo "📚 Creating lib utilities..."
mkdir -p src/lib

touch src/lib/api.ts
touch src/lib/validators.ts
touch src/lib/utils.ts
touch src/lib/constants.ts

# Frontend - Hooks
echo "🎣 Creating custom hooks..."
mkdir -p src/hooks

touch src/hooks/useBooking.ts
touch src/hooks/useServices.ts
touch src/hooks/useAuth.ts
touch src/hooks/index.ts

# Frontend - Types
echo "🔤 Creating TypeScript types..."
mkdir -p src/types

touch src/types/index.ts

# Backend - Controllers
echo "🎮 Creating backend controllers..."
mkdir -p backend/src/controllers

touch backend/src/controllers/authController.ts
touch backend/src/controllers/bookingController.ts
touch backend/src/controllers/serviceController.ts
touch backend/src/controllers/userController.ts
touch backend/src/controllers/reviewController.ts

# Backend - Models
echo "🗂️  Creating database models..."
mkdir -p backend/src/models

touch backend/src/models/User.ts
touch backend/src/models/Booking.ts
touch backend/src/models/Service.ts
touch backend/src/models/Review.ts
touch backend/src/models/Staff.ts

# Backend - Routes
echo "🛣️  Creating API routes..."
mkdir -p backend/src/routes

touch backend/src/routes/authRoutes.ts
touch backend/src/routes/bookingRoutes.ts
touch backend/src/routes/serviceRoutes.ts
touch backend/src/routes/userRoutes.ts
touch backend/src/routes/reviewRoutes.ts

# Backend - Middleware
echo "🔧 Creating middleware..."
mkdir -p backend/src/middleware

touch backend/src/middleware/auth.ts
touch backend/src/middleware/errorHandler.ts
touch backend/src/middleware/validate.ts
touch backend/src/middleware/rateLimiter.ts

# Backend - Services
echo "⚡ Creating backend services..."
mkdir -p backend/src/services

touch backend/src/services/notification.ts
touch backend/src/services/booking.ts
touch backend/src/services/email.ts

# Backend - Config
echo "⚙️  Creating backend config..."
mkdir -p backend/src/config

touch backend/src/config/database.ts
touch backend/src/config/environment.ts

# Backend - Root Files
touch backend/src/server.ts
touch backend/.env.example
touch backend/tsconfig.json

echo "✅ Project structure created successfully!"
echo ""
echo "📁 Directory tree created:"
echo "├── src/"
echo "│   ├── app/"
echo "│   │   ├── (public)/ [home, about, services, booking, contact, reviews]"
echo "│   │   ├── (admin)/ [dashboard, bookings, services, staff, analytics]"
echo "│   │   ├── api/ [auth, bookings, services, users, reviews]"
echo "│   │   ├── layout.tsx"
echo "│   │   ├── page.tsx"
echo "│   │   └── providers.tsx"
echo "│   ├── components/"
echo "│   │   ├── ui/ [Button, Card, Badge, Input, Modal, Spinner]"
echo "│   │   ├── layout/ [Navbar, Footer, MobileMenu]"
echo "│   │   ├── booking/ [BookingSteps, ServiceCard, DatePicker, TimePicker]"
echo "│   │   └── admin/ [Sidebar, BookingTable, MetricCard]"
echo "│   ├── hooks/ [useBooking, useServices, useAuth]"
echo "│   ├── lib/ [api, validators, utils, constants]"
echo "│   ├── styles/ [globals.css]"
echo "│   └── types/"
echo "├── backend/"
echo "│   └── src/"
echo "│       ├── controllers/ [auth, booking, service, user, review]"
echo "│       ├── models/ [User, Booking, Service, Review, Staff]"
echo "│       ├── routes/ [auth, booking, service, user, review]"
echo "│       ├── middleware/ [auth, errorHandler, validate, rateLimiter]"
echo "│       ├── services/ [notification, booking, email]"
echo "│       ├── config/ [database, environment]"
echo "│       └── server.ts"
echo ""
echo "🚀 Next steps:"
echo "   1. Review and update empty component files"
echo "   2. Configure environment variables (backend/.env)"
echo "   3. Set up MongoDB connection in backend/src/config/database.ts"
echo "   4. Install backend dependencies: cd backend && npm install"
