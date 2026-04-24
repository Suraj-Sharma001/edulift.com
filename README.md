# EduLift

EduLift is a Next.js application for student opportunities and hiring workflows, including:
- Candidate and recruiter authentication
- Scholarship applications
- Internship applications and status tracking

## Tech Stack
- Next.js 15 (App Router)
- React 19
- MongoDB + Mongoose
- JWT authentication (HttpOnly cookie)

## Environment Setup
1. Copy `.env.example` to `.env.local`.
2. Fill required values:
	- `MONGO_URI`
	- `JWT_SECRET`
3. Optional:
	- `EMAIL_USER` and `EMAIL_PASS` for registration email notifications
	- `RESEND_API_KEY` and `RESEND_FROM` for welcome email endpoint

## Local Development
```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production Build
```bash
npm run build
npm start
```

## Smoke Test
Run with the dev server running:
```bash
npm run test:smoke
```

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/scholarship-apply`
- `POST /api/auth/internship-apply`
- `GET /api/auth/my-applications`
- `PATCH /api/auth/update-application-status`
- `GET /api/scholarships`
- `POST /api/send-welcome-email`

## Notes
- In production, `JWT_SECRET` must be set.
- Authentication is cookie-based with a `token` HttpOnly cookie.
- Recruiter internship posting screens currently use local browser storage as a temporary persistence layer and can be replaced with a dedicated backend model later.