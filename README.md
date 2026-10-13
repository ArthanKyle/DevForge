# DevForge - Software & Automation Studio

A production-ready, globally deployable full-stack application for custom software project cost estimation, project intake management, and milestone-based payment tracking.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (PostgreSQL with RLS)
- **Testing:** Jest, React Testing Library, fast-check (Property-Based Testing), Playwright (E2E)
- **Deployment:** Vercel + Supabase

## Features

- 🎯 **Dual-Track Pricing Engine:** Student and Enterprise pricing models with complexity-based calculations
- 📊 **Interactive Estimator:** Real-time cost and timeline calculation with configurable add-ons
- 🚀 **Rush Delivery Option:** 20% surcharge for 30% faster delivery
- 🛡️ **Policy-Based Filtering:** Automatic rejection of prohibited project types
- 🔐 **Secure Admin Portal:** Role-based access control with Supabase Auth
- 📋 **Kanban Pipeline:** Six-stage project management workflow
- 💰 **Milestone Payment Tracking:** 30% Deposit, 40% Beta, 30% Final
- 🌍 **Global Deployment:** Edge-optimized for worldwide access

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devforge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
devforge/
├── app/                    # Next.js App Router pages and API routes
│   ├── (public)/          # Public landing page
│   ├── partner/           # Admin portal (protected)
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Business logic and utilities
│   ├── supabase/         # Supabase client and queries
│   ├── pricing-engine.ts # Pricing calculations
│   ├── timeline-calculator.ts
│   └── policy-filter.ts
├── __tests__/            # Test files
│   ├── unit/             # Unit tests
│   ├── property/         # Property-based tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
└── public/               # Static assets
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm test             # Run unit and property tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:e2e     # Run E2E tests with Playwright
npm run test:e2e:ui  # Run E2E tests with UI mode
```

## Testing

This project follows a comprehensive testing strategy:

- **Unit Tests:** Verify specific examples and edge cases
- **Property-Based Tests:** Verify universal properties across all inputs (28 correctness properties)
- **Integration Tests:** Test complete workflows and API interactions
- **E2E Tests:** Test critical user journeys with Playwright

Coverage threshold: 80% for branches, functions, lines, and statements.

## Database Setup

Refer to `.kiro/specs/devforge-production/design.md` for complete database schema and RLS policies.

Key tables:
- `profiles` - User roles for RBAC
- `intakes` - Project intake submissions
- `projects` - Approved projects in pipeline
- `add_ons` - Configurable add-on services
- `api_logs` - API request logging

## Architecture

- **Client Layer:** React components with Tailwind CSS
- **Business Logic:** Pure TypeScript functions for pricing, timeline, and validation
- **Data Access:** Supabase client with RLS policies
- **Database:** PostgreSQL with row-level security

## Security Features

- Row-level security (RLS) policies on all tables
- Role-based access control (admin/developer)
- Input sanitization and validation
- API rate limiting (10 requests per 60 seconds per IP)
- SQL injection and XSS protection

## Deployment

### Vercel Deployment

1. Push to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

### Supabase Configuration

1. Create production project
2. Run database migrations
3. Configure RLS policies
4. Set up authentication

## Documentation

- [Requirements](/.kiro/specs/devforge-production/requirements.md)
- [Design Document](/.kiro/specs/devforge-production/design.md)
- [Implementation Plan](/.kiro/specs/devforge-production/tasks.md)

## License

Private - All Rights Reserved
