# 🚀 PlanSync

**A modern, full-stack project management and issue tracking platform built with Next.js 15, designed for agile teams to collaborate seamlessly.**

## ✨ Features

### 🎯 **Sprint Management**
- Create and manage sprints with customizable date ranges
- Track sprint status (Planned, Active, Completed)
- Visual sprint timeline with start/end date management
- Sprint-based issue organization

### 📋 **Issue Tracking**
- Drag-and-drop Kanban board for intuitive issue management
- Four-column workflow: TODO, IN_PROGRESS, IN_REVIEW, DONE
- Priority-based color coding (Low, Medium, High, Urgent)
- Rich markdown descriptions with real-time preview
- Issue assignment and reporting system
- Advanced filtering by assignee, priority, and search

### 👥 **Organization & Team Management**
- Multi-organization support with Clerk authentication
- Organization-based project isolation
- Role-based access control (Admin/Member)
- Team member visualization and assignment
- Personal dashboard showing assigned and reported issues

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Dark mode optimized interface
- Real-time loading states with elegant loaders
- Smooth animations and transitions
- Mobile-first approach

### 🔐 **Authentication & Security**
- Secure authentication powered by Clerk
- Organization-based access control
- Protected routes and API endpoints
- User session management

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible component library
- **@hello-pangea/dnd** - Drag-and-drop functionality
- **@uiw/react-md-editor** - Markdown editing and preview

### **Backend**
- **Next.js Server Actions** - Type-safe server-side operations
- **Prisma ORM** - Database management and migrations
- **PostgreSQL (Neon)** - Cloud-native database
- **Clerk** - Authentication and user management

### **Additional Tools**
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **React Spinners** - Loading indicators

## 📦 Project Structure

```
plansync/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application
│   │   ├── organization/  # Organization management
│   │   ├── project/       # Project pages
│   │   └── onboarding/    # User onboarding
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── actions/              # Server actions
├── lib/                  # Utility functions
├── prisma/              # Database schema
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)
- Clerk account for authentication

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zainop23/PlanSync.git
cd PlanSync
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Database
DATABASE_URL=your_postgresql_connection_string
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🎯 Key Features Explained

### Drag & Drop Kanban Board
Built with @hello-pangea/dnd, the board allows seamless drag-and-drop of issues across different status columns with real-time updates.

### Sprint Planning
Create time-boxed sprints with start and end dates. Track progress through different sprint statuses and manage issue priorities effectively.

### Rich Issue Details
Each issue supports markdown descriptions, priority levels, assignee tracking, and status management - all in a clean, intuitive interface.

### Organization Management
Multi-tenant architecture allows teams to create separate organizations, each with their own projects, sprints, and issues.

## 📝 Database Schema

Key entities:
- **User** - Team members with Clerk integration
- **Organization** - Tenant isolation
- **Project** - Container for sprints and issues
- **Sprint** - Time-boxed development cycles
- **Issue** - Individual work items with status, priority, and assignments

## 🔧 Environment Setup

### Clerk Setup
1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys to `.env`
4. Enable organizations in your Clerk dashboard

### Database Setup (Neon)
1. Create an account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `.env`
4. Run `npx prisma db push` to create tables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Neon](https://neon.tech/)

---

**Built with ❤️ for agile teams everywhere**
