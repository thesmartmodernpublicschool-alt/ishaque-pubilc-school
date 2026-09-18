# Alshafique Public School, Kamber – School Management Website

A modern, professional, responsive school management website and portal system.

## Features Implemented

### Public Website
- **Home Page**: Hero, stats, principal message, programs, news, events, achievements, testimonials, gallery preview, contact & map
- **About**: School intro, vision, mission, values, history, faculty, facilities
- **Academics**: Levels (Playgroup–Secondary), subjects, calendar, exam system
- **Admissions**: Info, eligibility, documents, fee structure, **working online application form** with reference number generation
- **Events**: Calendar of school events
- **Gallery**: Photo gallery with lightbox-ready structure
- **Notices**: Notice board with categories
- **Contact**: Form, address, phone, email, timings, WhatsApp float button

### Portals (Role-based)
- **Login**: Student / Parent / Teacher / Admin with demo credentials
- **Student / Parent Dashboard**: Profile, attendance %, results, fee status & history, homework, notices
- **Teacher Portal**: Structure ready for classes, attendance, marks, homework upload
- **Admin Dashboard**: Overview stats, students table, attendance overview, admission applications (live from form), quick actions

### Design & UX
- Clean white + professional blue/green theme
- Dark / Light mode toggle
- Urdu / English language toggle (basic)
- Fully responsive (desktop, tablet, mobile)
- Sticky header + mobile hamburger menu
- Smooth animations, rounded cards, modern typography
- WhatsApp floating contact button
- Printable reports (print CSS)

### Security (Simulated)
- Role-based access (session in localStorage)
- Protected dashboard routes
- Form validation
- Logout functionality

### Data
- Realistic sample data for students, teachers, notices, events, fees, results, homework
- Applications stored in browser localStorage and visible in Admin dashboard

## Demo Login Credentials

| Role     | Username | Password    |
|----------|----------|-------------|
| Admin    | admin    | admin123    |
| Teacher  | teacher  | teacher123  |
| Student  | student  | student123  |
| Parent   | parent   | parent123   |

## How to Run

1. Open the folder `school-website` in any static file server, or simply open `index.html` in a browser.
2. For best experience use a local server:
   ```bash
   cd school-website
   python3 -m http.server 8080
   # then visit http://localhost:8080
   ```
3. Navigate the public site, submit an admission application, then login as admin to see it appear.

## Database Schema (for production backend)

```sql
-- Users (authentication)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin','teacher','student','parent')),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Students
CREATE TABLE students (
  id VARCHAR(20) PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  father_name VARCHAR(100),
  dob DATE,
  gender VARCHAR(10),
  class_id INT,
  section VARCHAR(5),
  phone VARCHAR(20),
  address TEXT,
  admission_date DATE
);

-- Teachers
CREATE TABLE teachers (
  id VARCHAR(20) PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  subject VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(100)
);

-- Classes
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  section VARCHAR(5),
  teacher_id VARCHAR(20) REFERENCES teachers(id)
);

-- Subjects
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  class_id INT REFERENCES classes(id)
);

-- Attendance
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(20) REFERENCES students(id),
  date DATE NOT NULL,
  status VARCHAR(10) CHECK (status IN ('Present','Absent','Leave')),
  marked_by VARCHAR(20)
);

-- Fees
CREATE TABLE fees (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(20) REFERENCES students(id),
  month VARCHAR(20),
  amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'Pending',
  paid_date DATE,
  receipt_no VARCHAR(30)
);

-- Exams & Results
CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  start_date DATE,
  end_date DATE
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(20) REFERENCES students(id),
  exam_id INT REFERENCES exams(id),
  subject_id INT REFERENCES subjects(id),
  marks DECIMAL(5,2),
  total DECIMAL(5,2)
);

-- Homework
CREATE TABLE homework (
  id SERIAL PRIMARY KEY,
  class_id INT REFERENCES classes(id),
  subject VARCHAR(50),
  title VARCHAR(200),
  due_date DATE,
  teacher_id VARCHAR(20)
);

-- Notices
CREATE TABLE notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  category VARCHAR(50),
  content TEXT,
  published_at TIMESTAMP DEFAULT NOW(),
  published_by INT
);

-- Events
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  event_date DATE,
  event_time VARCHAR(20),
  location VARCHAR(100),
  type VARCHAR(50)
);

-- Admissions
CREATE TABLE admissions (
  id SERIAL PRIMARY KEY,
  app_no VARCHAR(30) UNIQUE,
  student_name VARCHAR(100),
  father_name VARCHAR(100),
  dob DATE,
  gender VARCHAR(10),
  class_applying VARCHAR(30),
  previous_school VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gallery
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  category VARCHAR(50),
  image_url VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT NOW()
);
```

## Production Recommendations

For a production system replace the localStorage simulation with:
- **Backend**: Next.js / Node.js + Express / Laravel / Django
- **Database**: PostgreSQL or MySQL
- **Auth**: JWT or session-based with bcrypt password hashing
- **File uploads**: Cloud storage (S3 / local with validation)
- **PDF generation**: libraries for result cards and fee receipts
- **Charts**: Chart.js or Recharts for dashboard analytics

## File Structure

```
school-website/
├── index.html          # Home
├── about.html
├── academics.html
├── admissions.html     # Working application form
├── contact.html
├── events.html
├── gallery.html
├── notices.html
├── login.html          # Multi-role login
├── css/styles.css      # Complete theme + responsive
├── js/main.js          # Auth, sample data, helpers
├── admin/dashboard.html
├── student/dashboard.html
├── teacher/            # (extend similarly)
├── parent/             # (shares student view)
└── README.md
```

Built with pure HTML, CSS & JavaScript for easy deployment and demonstration.
All core navigation, forms, authentication flow and dashboards are functional with sample data.
