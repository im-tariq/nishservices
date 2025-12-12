# NishServices 

## 1. Project Overview

### 1.1 Application Concept

NishServices is a unified university management platform that provides digital services to students, faculty, and administrative staff through role-based dashboards and permissions.

### 1.1.1 Tech Stack

#### Mobile Application (Frontend)

**Primary Recommendation:**
- **Framework**: React Native (Expo)
- **Navigation**: React Navigation v6
- **State Management**: Redux Toolkit + RTK Query
- **UI Components**: React Native Paper or NativeBase
- **HTTP Client**: Axios
- **Real-time**: Socket.io-client
- **Local Storage**: AsyncStorage
- **Image Handling**: react-native-fast-image
- **Notifications**: Expo Notifications

#### Backend Services

**Primary Recommendation:**
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 
- **Language**: TypeScript
- **Database**: mySQL (primary)
- **ORM/Query Builder**: Prisma or TypeORM
- **Authentication**: JWT (jsonwebtoken) + Passport.js
- **File Storage**: Google Cloud Storage 
- **Real-time**: Socket.io
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Joi or Zod
- **Email**: Nodemailer / SendGrid / AWS SES

#### Database & Caching

**Primary:**
- **mySQL** - Relational database
- **Redis** - Caching, session storage, real-time queue management

**Alternatives:**
- **Supabase** - PostgreSQL with built-in real-time features

#### Cloud Services & Infrastructure

**Recommended:**
- **Hosting**: AWS / Google Cloud Platform / Azure / DigitalOcean
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions / GitLab CI / Jenkins
- **Monitoring**: Sentry (error tracking), LogRocket (session replay)
- **Analytics**: Firebase Analytics / Mixpanel

#### Development Tools

- **Version Control**: Git + GitHub/GitLab
- **Package Manager**: npm / yarn / pnpm
- **Code Quality**: ESLint, Prettier, Husky
- **Testing**: Jest, React Native Testing Library, Supertest
- **API Testing**: postman

### 1.2 Target Audience

- **Students** - Primary users accessing academic services
- **Professors** - Academic staff managing courses and content
- **Employees** - Administrative staff handling department operations
- **Supervisors** - System administrators with full control

## 2. Application Flow & Navigation

### 2.1 Authentication Flow

#### Splash Screen

- University logo centered
- "NishServices" below logo
- "Get Started" button
- 2000ms duration then auto-navigate

#### Role Selection Screen

- Three cards layout: Student, Professor, Employee
- Each card contains icon and short description
- Only shown on first login, then remembered

#### Login Screens

- **Student**: Student Number + Password
- **Professor/Employee**: Email + Password

### 2.2 Main Dashboard (All Roles)

#### Header Section

- Greeting: "Welcome, [Name]!"
- Profile icon (supervisor-uploaded only)

#### Content Area

- Cards/Grid layout for quick access to features
- Services: Queue, NoteHub, Find My Mentor, Course Reviewer, University Info, Events, Contact Us

#### Bottom Tab Bar

- Home
- Notifications
- Profile
- Settings

## 3. Core Services Implementation

### 3.1 Queue Management System

#### Student/Professor Flow

- "+ Get Queue Number" floating button
- Department selector dropdown
- Ticket status display
- Live queue updates
- Real-time position tracking

#### Employee Flow

- List of active queues for assigned department only
- Action buttons: Next, Recall, Complete, Cancel
- Real-time updates without refresh

#### Database Schema

```sql
Departments(
  id,
  name,
  code,
  is_active,
  created_at
)

QueueTickets(
  id,
  ticket_number,
  department_id,
  user_id,
  user_type,
  service_type,
  status,
  estimated_wait_time,
  created_at,
  served_at,
  cancelled_at
)

QueueActions(
  id,
  ticket_id,
  employee_id,
  action_type,
  timestamp
)
```

#### API Endpoints

- `POST /api/queue/request-ticket`
- `GET /api/queue/department/{id}/active-tickets`
- `PUT /api/queue/ticket/{id}/status`
- `GET /api/queue/user-tickets`
- `DELETE /api/queue/ticket/{id}`

### 3.2 NoteHub Service

#### User Interface

- Grid/List toggle view
- Top search bar with smart filtering
- Filter dropdown: [All | My Notes | Shared Notes | Faculty Notes]
- Tags: Blue "Faculty Note", Gray "My Upload"
- Actions: Preview, Download, Comment, Like, Report
- "+ Add Note" floating button (role-based)

#### File Upload Configuration

- **Allowed types**: PDF, DOC, DOCX, JPG, PNG, JPEG, TXT
- **Max file size**: 20MB
- Cloud storage with compression

### 3.3 Find My Mentor

#### User Interface

- Top search bar with name/department filtering
- Filters: [All | My Department | Updated Recently | New Professors]
- Professor cards grid/list view

#### Card Elements

- Name, Department, Office Location
- Email, Office Hours
- Verification tags: 🔵 Verified, 🟡 Pending Update, 🟢 New

#### User Actions

- **Students**: Mark Favorite, Subscribe for updates
- **Professors**: Edit own info only

### 3.4 Course Reviewer

#### User Interface

- Course list with search/filter
- Filter: [All Reviews | My Reviews | Instructor Responses | High/Low Rating]
- 1-5 star rating system
- Anonymous student reviews
- File attachments support (PDF, Image, Text)
- "+ Add Review" floating button

#### Analytics

- **Professors**: View student feedback and respond
- **Staff**: Performance metrics and reporting

### 3.5 University Info

#### Information Architecture

- Hyperlinked grid cards layout
- Categories: University Directory, NEWS, Academic Calendar, Announcements, Document Center, FAQ, CONTACT

#### Features

- Keyword search across all content
- Filter: [All | Departments | Calendar | Announcements | Documents | FAQ | Contact]
- Tags: Blue "Official", Green "New"
- ⭐ Bookmark favorites system

### 3.6 Events Management

#### User Interface

- Event List/Grid with calendar toggle
- Search by title, category, date
- Filter: [All | Academic | Social | Upcoming | Past]
- Event cards with: Image, Title, Date, Location, Seat Availability

#### User Actions

- **Students**: Register, Save to Calendar, Set Reminders
- **Professors/Staff**: Create Events, Manage Registrations, Track Attendance
- "+ Create Event" floating button (role-based)

### 3.7 Contact Us

#### Team Display

- Grid cards layout
- Card elements: Profile icon, Name, Role, Email (clickable), Phone (optional), Department, Description
- Filters: IT Team, Development Team, Administration Team, Design Team

#### Actions

- Email opens mail app
- Phone opens phone app

## 4. Design System

### 4.1 Color Palette

#### Background Colors

- **Light**: `#FFFFFF`
- **Dark**: `#000000`

#### Primary Colors

- **Primary**: `#00295B` (Obsidian Navy)
- **Accent**: `#4CAF50` (Green from logo)

#### Text Colors

- **Light mode**: `#000000`
- **Dark mode**: `#FFFFFF`
- **Secondary**: `#666666`

#### Status Colors

- **Waiting**: `#FFA000`
- **In Progress**: `#2196F3`
- **Completed**: `#4CAF50`
- **Cancelled**: `#F44336`

### 4.2 Typography

#### Font Family

Modern sans-serif: Inter, Roboto, or SF Pro

#### Font Scale

| Size | Value |
|------|-------|
| xs   | 12px  |
| sm   | 14px  |
| base | 16px  |
| lg   | 18px  |
| xl   | 20px  |
| 2xl  | 24px  |
| 3xl  | 30px  |

#### Font Weights

- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### 4.3 Component Specifications

#### Bottom Tab Bar

- **Height**: 60px
- **Background**: `#00295B` (Obsidian Navy)
- **Text color**: White
- **Icons**: White filled

#### Cards

- **Corner radius**: 8px
- **Shadow**: 2px elevation
- **Padding**: 16px
- **Background**: White (Light) / Dark Gray (Dark)

#### Floating Action Button

- **Size**: 56px
- **Corner radius**: 28px
- **Background**: `#00295B`
- **Icon color**: White
- **Position**: Bottom right 16px

## 5. Settings & Preferences

### 5.1 Settings Screen Structure

#### Profile Section

- View Profile Info (read-only)
- Profile Image (supervisor-uploaded only)

#### Appearance Section

- Theme Toggle: Light/Dark mode
- Language: Future option placeholder

#### Account Section

- Change Password
- Logout

### 5.2 Theme System

- Manual toggle in Settings
- Persistence: Saved to device storage
- Immediate theme change application

## 6. Database Schema

### 6.1 Complete Database Schema

```sql
-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  student_number VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student', 'professor', 'employee', 'supervisor') NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  profile_image_url VARCHAR(500),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_student_number (student_number),
  INDEX idx_role (role)
);

CREATE TABLE refresh_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(500) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_token (token),
  INDEX idx_user_id (user_id)
);

-- ============================================
-- DEPARTMENTS
-- ============================================

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_is_active (is_active)
);

-- ============================================
-- QUEUE MANAGEMENT SYSTEM
-- ============================================

CREATE TABLE queue_tickets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  department_id INT NOT NULL,
  user_id INT NOT NULL,
  user_type ENUM('student', 'professor') NOT NULL,
  service_type VARCHAR(100),
  status ENUM('waiting', 'in_progress', 'completed', 'cancelled') DEFAULT 'waiting',
  estimated_wait_time INT DEFAULT 0,
  position_in_queue INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  served_at DATETIME,
  cancelled_at DATETIME,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_department_id (department_id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_ticket_number (ticket_number)
);

CREATE TABLE queue_actions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ticket_id INT NOT NULL,
  employee_id INT NOT NULL,
  action_type ENUM('next', 'recall', 'complete', 'cancel') NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (ticket_id) REFERENCES queue_tickets(id),
  FOREIGN KEY (employee_id) REFERENCES users(id),
  INDEX idx_ticket_id (ticket_id),
  INDEX idx_employee_id (employee_id)
);

-- ============================================
-- NOTEHUB SERVICE
-- ============================================

CREATE TABLE notes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url VARCHAR(500) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INT NOT NULL,
  uploaded_by INT NOT NULL,
  uploader_type ENUM('student', 'professor', 'employee') NOT NULL,
  is_faculty_note BOOLEAN DEFAULT FALSE,
  is_shared BOOLEAN DEFAULT FALSE,
  department_id INT,
  download_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_uploaded_by (uploaded_by),
  INDEX idx_department_id (department_id),
  INDEX idx_is_faculty_note (is_faculty_note),
  FULLTEXT idx_search (title, description)
);

CREATE TABLE note_comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  note_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_note_id (note_id),
  INDEX idx_user_id (user_id)
);

CREATE TABLE note_likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  note_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (note_id, user_id),
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_note_id (note_id)
);

CREATE TABLE note_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  note_id INT NOT NULL,
  reported_by INT NOT NULL,
  reason TEXT NOT NULL,
  status ENUM('pending', 'reviewed', 'resolved', 'dismissed') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewed_at DATETIME,
  FOREIGN KEY (note_id) REFERENCES notes(id),
  FOREIGN KEY (reported_by) REFERENCES users(id),
  INDEX idx_note_id (note_id),
  INDEX idx_status (status)
);

-- ============================================
-- FIND MY MENTOR
-- ============================================

CREATE TABLE professor_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  department_id INT NOT NULL,
  office_location VARCHAR(255),
  office_hours TEXT,
  bio TEXT,
  research_interests TEXT,
  verification_status ENUM('verified', 'pending_update', 'new') DEFAULT 'new',
  last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_department_id (department_id),
  INDEX idx_verification_status (verification_status)
);

CREATE TABLE professor_favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  professor_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (student_id, professor_id),
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (professor_id) REFERENCES professor_profiles(id) ON DELETE CASCADE,
  INDEX idx_student_id (student_id)
);

CREATE TABLE professor_subscriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  professor_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_subscription (student_id, professor_id),
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (professor_id) REFERENCES professor_profiles(id) ON DELETE CASCADE,
  INDEX idx_student_id (student_id)
);

-- ============================================
-- COURSE REVIEWER
-- ============================================

CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_code VARCHAR(50) UNIQUE NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  department_id INT NOT NULL,
  professor_id INT,
  description TEXT,
  credits INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (professor_id) REFERENCES users(id),
  INDEX idx_course_code (course_code),
  INDEX idx_department_id (department_id),
  INDEX idx_professor_id (professor_id),
  FULLTEXT idx_search (course_code, course_name, description)
);

CREATE TABLE course_reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  student_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_anonymous BOOLEAN DEFAULT TRUE,
  helpful_count INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id),
  INDEX idx_course_id (course_id),
  INDEX idx_student_id (student_id),
  INDEX idx_rating (rating)
);

CREATE TABLE review_attachments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  review_id INT NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (review_id) REFERENCES course_reviews(id) ON DELETE CASCADE,
  INDEX idx_review_id (review_id)
);

CREATE TABLE review_responses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  review_id INT NOT NULL,
  professor_id INT NOT NULL,
  response_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (review_id) REFERENCES course_reviews(id) ON DELETE CASCADE,
  FOREIGN KEY (professor_id) REFERENCES users(id),
  UNIQUE KEY unique_response (review_id),
  INDEX idx_professor_id (professor_id)
);

-- ============================================
-- UNIVERSITY INFO
-- ============================================

CREATE TABLE university_directory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  category ENUM('directory', 'news', 'calendar', 'announcement', 'document', 'faq', 'contact') NOT NULL,
  department_id INT,
  file_url VARCHAR(500),
  is_official BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_category (category),
  INDEX idx_department_id (department_id),
  FULLTEXT idx_search (title, content)
);

CREATE TABLE academic_calendar (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  event_type VARCHAR(100),
  is_holiday BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_start_date (start_date),
  INDEX idx_event_type (event_type)
);

CREATE TABLE bookmarks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  item_type ENUM('directory', 'news', 'announcement', 'document', 'faq') NOT NULL,
  item_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_bookmark (user_id, item_type, item_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- ============================================
-- EVENTS MANAGEMENT
-- ============================================

CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('academic', 'social', 'sports', 'cultural', 'other') NOT NULL,
  event_date DATETIME NOT NULL,
  end_date DATETIME,
  location VARCHAR(255),
  image_url VARCHAR(500),
  max_capacity INT,
  current_registrations INT DEFAULT 0,
  is_registration_required BOOLEAN DEFAULT FALSE,
  registration_deadline DATETIME,
  created_by INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_event_date (event_date),
  INDEX idx_category (category),
  INDEX idx_created_by (created_by),
  FULLTEXT idx_search (title, description)
);

CREATE TABLE event_registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  registration_status ENUM('registered', 'cancelled', 'attended', 'absent') DEFAULT 'registered',
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  cancelled_at DATETIME,
  attended_at DATETIME,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_registration (event_id, user_id),
  INDEX idx_event_id (event_id),
  INDEX idx_user_id (user_id),
  INDEX idx_registration_status (registration_status)
);

CREATE TABLE event_reminders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  reminder_time DATETIME NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_reminder_time (reminder_time),
  INDEX idx_is_sent (is_sent)
);

-- ============================================
-- CONTACT US
-- ============================================

CREATE TABLE contact_teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_team_name (team_name)
);

CREATE TABLE contact_team_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_id INT NOT NULL,
  user_id INT NOT NULL,
  role VARCHAR(100),
  description TEXT,
  phone VARCHAR(20),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES contact_teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_team_id (team_id),
  INDEX idx_user_id (user_id)
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('queue', 'notehub', 'course_review', 'event', 'system', 'general') NOT NULL,
  related_entity_type VARCHAR(50),
  related_entity_id INT,
  is_read BOOLEAN DEFAULT FALSE,
  read_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_type (type),
  INDEX idx_created_at (created_at)
);

-- ============================================
-- USER PREFERENCES
-- ============================================

CREATE TABLE user_preferences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  theme ENUM('light', 'dark') DEFAULT 'light',
  language VARCHAR(10) DEFAULT 'en',
  push_notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications_enabled BOOLEAN DEFAULT TRUE,
  queue_notifications_enabled BOOLEAN DEFAULT TRUE,
  event_reminders_enabled BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- USER-DEPARTMENT ASSOCIATIONS
-- ============================================

CREATE TABLE user_departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  department_id INT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_department (user_id, department_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  INDEX idx_user_id (user_id),
  INDEX idx_department_id (department_id)
);
```

### 6.2 Database Indexes Summary

- **Primary Keys**: All tables have `id` as primary key
- **Foreign Keys**: Proper relationships with CASCADE deletes where appropriate
- **Unique Constraints**: Email, student_number, ticket_number, course_code, etc.
- **Indexes**: Created on frequently queried columns (user_id, department_id, status, dates)
- **Full-Text Search**: Notes, courses, events, and university directory support full-text search
- **Enums**: Used for status fields, roles, and categories for data integrity

### 6.3 Redis Cache Keys Structure

```
# User Sessions
session:{user_id}:{token}
session:{user_id}:refresh_token

# Queue Management
queue:department:{department_id}:active
queue:department:{department_id}:position:{ticket_id}
queue:ticket:{ticket_id}:status

# Caching
cache:notes:popular:{limit}
cache:events:upcoming:{limit}
cache:professors:department:{department_id}
cache:university:directory:{category}

# Real-time Updates
socket:user:{user_id}
socket:department:{department_id}
```

## 7. Project Folder Structure

### 7.1 Frontend (React Native) Structure

```
nishservices-mobile/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── splash.png
│   │   │   └── icons/
│   │   ├── fonts/
│   │   └── animations/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── FloatingActionButton.tsx
│   │   │   ├── BottomTabBar.tsx
│   │   │   └── Header.tsx
│   │   ├── queue/
│   │   │   ├── QueueTicketCard.tsx
│   │   │   ├── DepartmentSelector.tsx
│   │   │   └── QueueStatusBadge.tsx
│   │   ├── notehub/
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NotePreview.tsx
│   │   │   └── FileUploader.tsx
│   │   ├── mentor/
│   │   │   ├── ProfessorCard.tsx
│   │   │   └── VerificationBadge.tsx
│   │   ├── course/
│   │   │   ├── CourseCard.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   └── StarRating.tsx
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   └── EventCalendar.tsx
│   │   └── contact/
│   │       └── TeamMemberCard.tsx
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── RoleSelectionScreen.tsx
│   │   │   ├── StudentLoginScreen.tsx
│   │   │   └── ProfessorEmployeeLoginScreen.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.tsx
│   │   ├── queue/
│   │   │   ├── QueueScreen.tsx
│   │   │   ├── QueueTicketScreen.tsx
│   │   │   └── EmployeeQueueScreen.tsx
│   │   ├── notehub/
│   │   │   ├── NoteHubScreen.tsx
│   │   │   ├── NoteDetailScreen.tsx
│   │   │   └── AddNoteScreen.tsx
│   │   ├── mentor/
│   │   │   ├── FindMentorScreen.tsx
│   │   │   └── ProfessorDetailScreen.tsx
│   │   ├── course/
│   │   │   ├── CourseReviewScreen.tsx
│   │   │   ├── CourseDetailScreen.tsx
│   │   │   └── AddReviewScreen.tsx
│   │   ├── university/
│   │   │   ├── UniversityInfoScreen.tsx
│   │   │   └── DirectoryDetailScreen.tsx
│   │   ├── events/
│   │   │   ├── EventsScreen.tsx
│   │   │   ├── EventDetailScreen.tsx
│   │   │   └── CreateEventScreen.tsx
│   │   ├── contact/
│   │   │   └── ContactUsScreen.tsx
│   │   ├── notifications/
│   │   │   └── NotificationsScreen.tsx
│   │   ├── profile/
│   │   │   └── ProfileScreen.tsx
│   │   └── settings/
│   │       └── SettingsScreen.tsx
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── types.ts
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   ├── queueSlice.ts
│   │   │   ├── notehubSlice.ts
│   │   │   ├── mentorSlice.ts
│   │   │   ├── courseSlice.ts
│   │   │   ├── eventsSlice.ts
│   │   │   └── notificationsSlice.ts
│   │   └── api/
│   │       ├── authApi.ts
│   │       ├── queueApi.ts
│   │       ├── notehubApi.ts
│   │       ├── mentorApi.ts
│   │       ├── courseApi.ts
│   │       ├── eventsApi.ts
│   │       └── universityApi.ts
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── interceptors.ts
│   │   │   └── endpoints.ts
│   │   ├── socket/
│   │   │   └── socketService.ts
│   │   ├── storage/
│   │   │   └── storageService.ts
│   │   ├── notifications/
│   │   │   └── notificationService.ts
│   │   └── fileUpload/
│   │       └── fileUploadService.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   ├── useTheme.ts
│   │   ├── useNotifications.ts
│   │   └── useDebounce.ts
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── dateUtils.ts
│   │
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── queue.types.ts
│   │   ├── notehub.types.ts
│   │   ├── mentor.types.ts
│   │   ├── course.types.ts
│   │   ├── events.types.ts
│   │   └── api.types.ts
│   │
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   └── App.tsx
│
├── android/
├── ios/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── app.json
└── README.md
```

### 7.2 Backend (Node.js/Express) Structure

```
nishservices-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── cloudStorage.ts
│   │   ├── socket.ts
│   │   └── env.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Department.ts
│   │   ├── QueueTicket.ts
│   │   ├── Note.ts
│   │   ├── ProfessorProfile.ts
│   │   ├── Course.ts
│   │   ├── CourseReview.ts
│   │   ├── Event.ts
│   │   ├── Notification.ts
│   │   └── index.ts
│   │
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── authController.ts
│   │   │   └── refreshTokenController.ts
│   │   ├── queue/
│   │   │   └── queueController.ts
│   │   ├── notehub/
│   │   │   └── notehubController.ts
│   │   ├── mentor/
│   │   │   └── mentorController.ts
│   │   ├── course/
│   │   │   └── courseController.ts
│   │   ├── university/
│   │   │   └── universityController.ts
│   │   ├── events/
│   │   │   └── eventsController.ts
│   │   ├── contact/
│   │   │   └── contactController.ts
│   │   ├── notifications/
│   │   │   └── notificationController.ts
│   │   └── users/
│   │       └── userController.ts
│   │
│   ├── routes/
│   │   ├── auth/
│   │   │   └── authRoutes.ts
│   │   ├── queue/
│   │   │   └── queueRoutes.ts
│   │   ├── notehub/
│   │   │   └── notehubRoutes.ts
│   │   ├── mentor/
│   │   │   └── mentorRoutes.ts
│   │   ├── course/
│   │   │   └── courseRoutes.ts
│   │   ├── university/
│   │   │   └── universityRoutes.ts
│   │   ├── events/
│   │   │   └── eventsRoutes.ts
│   │   ├── contact/
│   │   │   └── contactRoutes.ts
│   │   ├── notifications/
│   │   │   └── notificationRoutes.ts
│   │   └── index.ts
│   │
│   ├── middleware/
│   │   ├── auth/
│   │   │   ├── authenticate.ts
│   │   │   ├── authorize.ts
│   │   │   └── roleCheck.ts
│   │   ├── validation/
│   │   │   ├── queueValidation.ts
│   │   │   ├── notehubValidation.ts
│   │   │   └── commonValidation.ts
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   ├── fileUpload.ts
│   │   └── virusScan.ts
│   │
│   ├── services/
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   └── tokenService.ts
│   │   ├── queue/
│   │   │   └── queueService.ts
│   │   ├── notehub/
│   │   │   └── notehubService.ts
│   │   ├── notifications/
│   │   │   └── notificationService.ts
│   │   ├── email/
│   │   │   └── emailService.ts
│   │   ├── fileStorage/
│   │   │   └── storageService.ts
│   │   └── socket/
│   │       └── socketService.ts
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   │   ├── express.d.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   └── (migration files)
│   │   ├── seeders/
│   │   │   └── (seeder files)
│   │   └── queries/
│   │       └── (raw SQL queries if needed)
│   │
│   ├── socket/
│   │   ├── handlers/
│   │   │   ├── queueHandlers.ts
│   │   │   └── notificationHandlers.ts
│   │   └── socketServer.ts
│   │
│   └── app.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
├── docker-compose.yml
├── Dockerfile
└── README.md
```

### 7.3 Key Folder Structure Notes

#### Frontend Structure Benefits:
- **Component-based**: Reusable components organized by feature
- **Feature-based screens**: Each service has its own screen directory
- **Centralized state**: Redux store with feature slices
- **Service layer**: API calls, socket, storage abstracted
- **Type safety**: TypeScript types for all data structures
- **Theme system**: Centralized design tokens

#### Backend Structure Benefits:
- **MVC pattern**: Clear separation of concerns
- **Feature-based routes**: Each service has dedicated routes
- **Middleware chain**: Authentication, validation, error handling
- **Service layer**: Business logic separated from controllers
- **Database migrations**: Version-controlled schema changes
- **Socket handlers**: Real-time functionality organized

### 8 Performance Optimization

#### Image Handling

- Profile images: Supervisor uploaded only
- Automatic compression
- Local caching with expiration
- Lazy loading for lists/grids

#### Offline Support

- **Queue**: Cache and sync when online
- **Notes**: Cache for viewing, upload when online
- **Reviews**: Draft saving with auto-submit
- **Events**: Cache for viewing
- Automatic reconnection with user prompt

## 9. Security Implementation

### 9.1 Authentication Security

- Password policy: University standards
- Configurable session timeout
- Automatic JWT refresh
- Server-side role validation

### 9.2 Data Protection

- Virus scanning for all file uploads
- Encrypted personal data storage
- HTTPS enforcement
- Role-based API authorization

## 10. Notification System

### 10.1 Queue Notifications

- Ticket created confirmation
- Turn coming soon alert
- Now serving notification
- Service completed confirmation

### 10.2 NoteHub Notifications

- New comments on notes
- Content reporting alerts
- New interactions (likes/bookmarks)

### 10.3 Course Review Notifications

- New review submissions
- Instructor responses
- Low-rated course alerts

### 10.4 Event Notifications

- Registration confirmations
- Event reminders
- Capacity updates

## 11. File Upload Specifications

### 11.1 Supported Formats

- **Documents**: PDF, DOC, DOCX, TXT
- **Images**: JPG, PNG, JPEG
- **Maximum size**: 20MB per file

### 11.2 Upload Process

- Client-side validation
- Cloud storage integration
- Progress indicators
- Error handling and retry logic

