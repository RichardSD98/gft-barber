# GFT BARBER - Project Structure Setup Script (PowerShell)
# This script creates all necessary directories and files for the MERN stack barber booking platform

Write-Host "🏗️  Creating GFT BARBER project structure..." -ForegroundColor Green

# Frontend - Pages (Public)
Write-Host "📄 Creating public pages..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/app/(public)/home" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(public)/about" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(public)/services" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(public)/booking" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(public)/contact" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(public)/reviews" | Out-Null

New-Item -ItemType File -Force -Path "src/app/(public)/home/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(public)/about/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(public)/services/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(public)/booking/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(public)/contact/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(public)/reviews/page.tsx" | Out-Null

# Frontend - Pages (Admin)
Write-Host "🔐 Creating admin pages..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/app/(admin)/dashboard" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(admin)/bookings" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(admin)/services" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(admin)/staff" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/(admin)/analytics" | Out-Null

New-Item -ItemType File -Force -Path "src/app/(admin)/dashboard/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(admin)/bookings/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(admin)/services/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(admin)/staff/page.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/app/(admin)/analytics/page.tsx" | Out-Null

# Frontend - API Routes
Write-Host "🔌 Creating API routes..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/app/api/auth" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/api/bookings" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/api/services" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/api/users" | Out-Null
New-Item -ItemType Directory -Force -Path "src/app/api/reviews" | Out-Null

New-Item -ItemType File -Force -Path "src/app/api/auth/route.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/app/api/bookings/route.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/app/api/services/route.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/app/api/users/route.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/app/api/reviews/route.ts" | Out-Null

# Frontend - UI Components
Write-Host "🎨 Creating UI components..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/components/ui" | Out-Null

New-Item -ItemType File -Force -Path "src/components/ui/Button.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/ui/Card.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/ui/Badge.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/ui/Input.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/ui/Modal.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/ui/Spinner.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/ui/index.ts" | Out-Null

# Frontend - Layout Components
Write-Host "📐 Creating layout components..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/components/layout" | Out-Null

New-Item -ItemType File -Force -Path "src/components/layout/Navbar.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/layout/Footer.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/layout/MobileMenu.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/layout/index.ts" | Out-Null

# Frontend - Booking Components
Write-Host "📅 Creating booking components..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/components/booking" | Out-Null

New-Item -ItemType File -Force -Path "src/components/booking/BookingSteps.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/booking/ServiceCard.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/booking/DatePicker.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/booking/TimePicker.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/booking/index.ts" | Out-Null

# Frontend - Admin Components
Write-Host "⚙️  Creating admin components..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/components/admin" | Out-Null

New-Item -ItemType File -Force -Path "src/components/admin/Sidebar.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/admin/BookingTable.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/admin/MetricCard.tsx" | Out-Null
New-Item -ItemType File -Force -Path "src/components/admin/index.ts" | Out-Null

# Frontend - Library
Write-Host "📚 Creating lib utilities..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/lib" | Out-Null

New-Item -ItemType File -Force -Path "src/lib/api.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/lib/validators.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/lib/utils.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/lib/constants.ts" | Out-Null

# Frontend - Hooks
Write-Host "🎣 Creating custom hooks..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/hooks" | Out-Null

New-Item -ItemType File -Force -Path "src/hooks/useBooking.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/hooks/useServices.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/hooks/useAuth.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/hooks/index.ts" | Out-Null

# Frontend - Types
Write-Host "🔤 Creating TypeScript types..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "src/types" | Out-Null

New-Item -ItemType File -Force -Path "src/types/index.ts" | Out-Null

# Backend - Controllers
Write-Host "🎮 Creating backend controllers..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend/src/controllers" | Out-Null

New-Item -ItemType File -Force -Path "backend/src/controllers/authController.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/controllers/bookingController.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/controllers/serviceController.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/controllers/userController.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/controllers/reviewController.ts" | Out-Null

# Backend - Models
Write-Host "🗂️  Creating database models..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend/src/models" | Out-Null

New-Item -ItemType File -Force -Path "backend/src/models/User.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/models/Booking.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/models/Service.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/models/Review.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/models/Staff.ts" | Out-Null

# Backend - Routes
Write-Host "🛣️  Creating API routes..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend/src/routes" | Out-Null

New-Item -ItemType File -Force -Path "backend/src/routes/authRoutes.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/routes/bookingRoutes.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/routes/serviceRoutes.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/routes/userRoutes.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/routes/reviewRoutes.ts" | Out-Null

# Backend - Middleware
Write-Host "🔧 Creating middleware..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend/src/middleware" | Out-Null

New-Item -ItemType File -Force -Path "backend/src/middleware/auth.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/middleware/errorHandler.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/middleware/validate.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/middleware/rateLimiter.ts" | Out-Null

# Backend - Services
Write-Host "⚡ Creating backend services..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend/src/services" | Out-Null

New-Item -ItemType File -Force -Path "backend/src/services/notification.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/services/booking.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/services/email.ts" | Out-Null

# Backend - Config
Write-Host "⚙️  Creating backend config..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path "backend/src/config" | Out-Null

New-Item -ItemType File -Force -Path "backend/src/config/database.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/src/config/environment.ts" | Out-Null

# Backend - Root Files
New-Item -ItemType File -Force -Path "backend/src/server.ts" | Out-Null
New-Item -ItemType File -Force -Path "backend/.env.example" | Out-Null
New-Item -ItemType File -Force -Path "backend/tsconfig.json" | Out-Null

Write-Host "✅ Project structure created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Directory tree created:" -ForegroundColor Yellow
Write-Host "├── src/"
Write-Host "│   ├── app/"
Write-Host "│   │   ├── (public)/ [home, about, services, booking, contact, reviews]"
Write-Host "│   │   ├── (admin)/ [dashboard, bookings, services, staff, analytics]"
Write-Host "│   │   ├── api/ [auth, bookings, services, users, reviews]"
Write-Host "│   │   ├── layout.tsx"
Write-Host "│   │   ├── page.tsx"
Write-Host "│   │   └── providers.tsx"
Write-Host "│   ├── components/"
Write-Host "│   │   ├── ui/ [Button, Card, Badge, Input, Modal, Spinner]"
Write-Host "│   │   ├── layout/ [Navbar, Footer, MobileMenu]"
Write-Host "│   │   ├── booking/ [BookingSteps, ServiceCard, DatePicker, TimePicker]"
Write-Host "│   │   └── admin/ [Sidebar, BookingTable, MetricCard]"
Write-Host "│   ├── hooks/ [useBooking, useServices, useAuth]"
Write-Host "│   ├── lib/ [api, validators, utils, constants]"
Write-Host "│   ├── styles/ [globals.css]"
Write-Host "│   └── types/"
Write-Host "├── backend/"
Write-Host "│   └── src/"
Write-Host "│       ├── controllers/ [auth, booking, service, user, review]"
Write-Host "│       ├── models/ [User, Booking, Service, Review, Staff]"
Write-Host "│       ├── routes/ [auth, booking, service, user, review]"
Write-Host "│       ├── middleware/ [auth, errorHandler, validate, rateLimiter]"
Write-Host "│       ├── services/ [notification, booking, email]"
Write-Host "│       ├── config/ [database, environment]"
Write-Host "│       └── server.ts"
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Review and update empty component files"
Write-Host "   2. Configure environment variables (backend/.env)"
Write-Host "   3. Set up MongoDB connection in backend/src/config/database.ts"
Write-Host "   4. Install backend dependencies: cd backend && npm install"
