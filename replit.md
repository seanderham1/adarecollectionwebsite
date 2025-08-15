# The Adare Collection - Luxury Real Estate Website

## Overview

The Adare Collection is a luxury real estate website showcasing exclusive private residences for Ryder Cup 2027. Built as a full-stack application with React frontend and Express backend, this platform focuses on lead generation for high-net-worth individuals seeking premium accommodation. The site features a curated portfolio of properties with immersive visuals, contact management, and an exclusive access system for VIP properties.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Custom component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom luxury color palette and typography system
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL database schema
- **Development**: Hot module replacement via Vite middleware in development mode
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple

### Component Design System
- **Design Language**: Luxury-focused with Playfair Display (serif) and Lato (sans-serif) typography
- **Color Palette**: Warm golds, charcoal grays, and neutral tones for premium aesthetics
- **Layout Patterns**: Hero sections with video backgrounds, property carousels, and responsive grid layouts
- **Interactive Elements**: Hover animations, smooth scrolling, and intersection observer-based animations

### Data Architecture
The application uses a PostgreSQL database with three main entities:
- **Users**: Authentication and admin access management
- **Contacts**: Lead capture and inquiry management
- **Exclusive Access**: VIP access control with email-based invitation system

### Content Management
- **Property Data**: Static JSON configuration with property details, images, and metadata
- **Asset Management**: Unsplash integration for high-quality property imagery
- **Contact Forms**: Email-based contact system with pre-filled templates

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Drizzle ORM**: Type-safe database queries and schema management
- **Drizzle Kit**: Database migration and schema generation tooling

### UI & Styling
- **Radix UI**: Headless component primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component for property galleries

### Development Tools
- **Vite**: Fast build tool with HMR and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Form Handling & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Communication
- **Email Integration**: Mailto links for contact forms and inquiries
- **Toast Notifications**: User feedback system for form submissions and actions

The architecture emphasizes performance, accessibility, and luxury user experience while maintaining clean separation between frontend presentation and backend data management.