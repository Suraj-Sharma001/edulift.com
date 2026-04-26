# 🎓 EduLift - Student Aid Platform  

**Status**: ✅ **PRODUCTION READY**

A comprehensive platform for students to discover scholarships, internships, and community support - with a robust backend and modern frontend.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Resend API key (optional - has Nodemailer fallback)

### Installation

```bash
# Clone and install
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Build for production
npm run build

# Start production server
npm run start

# Or run development server
npm run dev
```

---

## 📋 What's Been Fixed

See [BUG_FIXES.md](./BUG_FIXES.md) for detailed list of all fixes and improvements.

### Key Fixes:
- ✅ Peer dependency conflicts resolved
- ✅ MongoDB connection working
- ✅ Email service with fallback
- ✅ Build optimized (30 pages, 106 kB)
- ✅ Registration & Login tested
- ✅ All APIs functioning

---

## 🏗️ Architecture

### Frontend (Next.js 15)
- Client-side rendered pages with dynamic export
- SSR support for home/landing pages
- Responsive UI with Tailwind CSS
- Role-based routing (Candidate/Recruiter)

### Backend (Next.js API Routes)
- JWT authentication with httpOnly cookies
- MongoDB with Mongoose models
- RESTful API endpoints
- Error handling middleware

### Database (MongoDB Atlas)
- Candidate & Recruiter collections
- Application tracking
- Listing management

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register              - Register user
POST   /api/auth/login                 - Login user
POST   /api/auth/logout                - Logout user
```

### Internships
```
GET    /api/internships/listings       - Get all listings
GET    /api/internships/[id]           - Get single listing
POST   /api/auth/internship-apply      - Apply for internship
```

### Scholarships
```
GET    /api/scholarships/listings      - Get all listings
GET    /api/scholarships/[id]          - Get single listing
POST   /api/auth/scholarship-apply     - Apply for scholarship
```

### Recruiter
```
POST   /api/recruiter/internships      - Create internship
POST   /api/recruiter/scholarships     - Create scholarship
GET    /api/recruiter/listings        - Get recruiter's listings
```

---

## 🔧 Environment Variables

```env
# Required
MONGO_URI=mongodb+srv://user:pass@cluster/db
JWT_SECRET=your-secret-key-32-chars-min

# Email (Resend - Primary)
RESEND_API_KEY=your-resend-key
RESEND_FROM=EduLift <email@domain>

# Email (Nodemailer - Fallback)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Optional
NODE_ENV=production
```

---

## 🧪 Testing

### Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "candidate"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

---

## 📦 Project Structure

```
src/
├── app/
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── internships/  # Internship endpoints
│   │   ├── scholarships/ # Scholarship endpoints
│   │   ├── recruiter/    # Recruiter endpoints
│   │   ├── config/       # Database config
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Mongoose models
│   │   └── utils/        # Helper functions
│   ├── components/       # React components
│   ├── layout.jsx        # Root layout
│   └── page.jsx          # Home page
└── public/               # Static assets
```

---

## 🔐 Security Features

- ✅ JWT tokens with httpOnly cookies
- ✅ Password hashing with bcryptjs
- ✅ Input validation on all endpoints
- ✅ Error messages don't leak sensitive info
- ✅ CORS protection ready
- ✅ Rate limiting ready

---

## 📊 Build Info

- **Framework**: Next.js 15.5.15
- **React**: 18.2.0
- **Database**: MongoDB with Mongoose 8.0.0
- **Authentication**: JWT
- **Email**: Resend + Nodemailer
- **Styling**: Tailwind CSS 4

### Build Output
```
✓ Compiled successfully in 4.0s
✓ 30 pages generated
✓ Bundle size: 106 kB (First Load JS)
✓ No build warnings or errors
```

---

## 🚢 Deployment

### To Vercel
```bash
git push origin main
# Vercel auto-deploys from main branch
```

### To Any Server
```bash
npm run build
npm run start
```



## 📖 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Full deployment instructions
- [BUG_FIXES.md](./BUG_FIXES.md) - All fixes and changes made
- [.env.example](./.env.example) - Environment variables template

---

## 👥 User Roles

### Candidate
- View internships and scholarships
- Apply for opportunities
- Track application status
- Manage profile

### Recruiter
- Post internships and scholarships
- View applicants
- Update application status
- Manage listings

---

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Check [BUG_FIXES.md](./BUG_FIXES.md)
3. Review error logs in `.next/server/logs`

---

## ✅ Launch Checklist

- [x] Build successful
- [x] APIs tested
- [x] Database connected
- [x] Email configured
- [x] Authentication working
- [x] Error handling complete
- [x] Documentation written
- [x] Ready to deploy

---

**Last Updated**: April 26, 2026
