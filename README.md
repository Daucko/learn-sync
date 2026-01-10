# LearnSync

**Transform Assignment Grading Into Minutes, Not Hours.**

LearnSync is an all-in-one educational platform designed to bridge the gap between schools, tutors, and students. By streamlining the assignment lifecycle—from upload to grading and analytics—LearnSync empowers educators to focus on student outcomes rather than administrative overhead.

## 🚀 Features

- **Multi-Role Dashboards**: Custom interfaces for Students, Tutors, and School Administrators.
- **Smart Grading**: Efficient evaluation tools with rubrics and quick feedback mechanisms.
- **Real-Time Analytics**: Insights into student progress and performance trends.
- **Instant Uploads**: Support for multiple formats including PDF, Word, images, and videos.
- **Organization Management**: seamless onboarding for schools and departments.
- **Automated Notifications**: Keep students informed about assignments and grades instantly.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Auth**: Custom JWT-based Authentication with Google OAuth support
- **Emails**: [Nodemailer](https://nodemailer.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd learn-sync
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Key variables required:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `JWT_SECRET`: For session management.
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: For Google OAuth.
   - `EMAIL_SERVER_*`: For verification and notification emails.

4. **Database Migration**:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Seed the database (Optional)**:
   ```bash
   npx prisma db seed
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📂 Project Structure

- `app/`: Next.js App Router (pages, layouts, and API routes).
- `components/`: Reusable UI components (shadcn/ui based).
- `lib/`: Utility functions, database clients, and shared logic.
- `prisma/`: Database schema and migration files.
- `public/`: Static assets.

## 📄 License

This project is private and intended for internal use.

