// Alshafique Public School - Main JS

// Theme toggle
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btns = document.querySelectorAll('.theme-toggle');
  btns.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
  });
}

// Language toggle (basic)
let currentLang = localStorage.getItem('lang') || 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'ur' : 'en';
  localStorage.setItem('lang', currentLang);
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = currentLang === 'en' ? el.getAttribute('data-en') : (el.getAttribute('data-ur') || el.getAttribute('data-en'));
  });
  const btns = document.querySelectorAll('.lang-toggle');
  btns.forEach(b => b.textContent = currentLang === 'en' ? 'اردو' : 'EN');
}

// Mobile nav
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }
}

// Sticky header
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
}

// Auth simulation
const USERS = {
  admin: { username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator' },
  teacher: { username: 'teacher', password: 'teacher123', role: 'teacher', name: 'Mr. Ahmed Khan' },
  student: { username: 'student', password: 'student123', role: 'student', name: 'Ali Hassan', studentId: 'APS-2024-001' },
  parent: { username: 'parent', password: 'parent123', role: 'parent', name: 'Mr. Hassan Ali', studentId: 'APS-2024-001' }
};

function login(username, password, role) {
  const user = Object.values(USERS).find(u => u.username === username && u.password === password && u.role === role);
  if (user) {
    const session = { ...user, loginTime: Date.now() };
    localStorage.setItem('session', JSON.stringify(session));
    return { success: true, user: session };
  }
  return { success: false, message: 'Invalid credentials' };
}

function logout() {
  localStorage.removeItem('session');
  window.location.href = '/login.html';
}

function getSession() {
  try {
    const s = localStorage.getItem('session');
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

function requireAuth(roles = []) {
  const session = getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  if (roles.length && !roles.includes(session.role)) {
    alert('Access denied');
    window.location.href = 'login.html';
    return null;
  }
  return session;
}

// Sample data
const SAMPLE_DATA = {
  students: [
    { id: 'APS-2024-001', name: 'Ali Hassan', class: 'Class 8', section: 'A', gender: 'Male', dob: '2012-05-15', father: 'Hassan Ali', phone: '0300-1234567', attendance: 92, feeStatus: 'Paid' },
    { id: 'APS-2024-002', name: 'Fatima Zahra', class: 'Class 7', section: 'B', gender: 'Female', dob: '2013-08-22', father: 'Muhammad Ali', phone: '0301-2345678', attendance: 88, feeStatus: 'Pending' },
    { id: 'APS-2024-003', name: 'Ahmed Raza', class: 'Class 9', section: 'A', gender: 'Male', dob: '2011-03-10', father: 'Raza Khan', phone: '0321-3456789', attendance: 95, feeStatus: 'Paid' },
    { id: 'APS-2024-004', name: 'Ayesha Bibi', class: 'Class 6', section: 'A', gender: 'Female', dob: '2014-11-05', father: 'Imran Shah', phone: '0333-4567890', attendance: 85, feeStatus: 'Paid' },
    { id: 'APS-2024-005', name: 'Usman Ghani', class: 'Class 10', section: 'A', gender: 'Male', dob: '2010-07-18', father: 'Ghani Khan', phone: '0345-5678901', attendance: 90, feeStatus: 'Pending' }
  ],
  teachers: [
    { id: 'T-001', name: 'Mr. Ahmed Khan', subject: 'Mathematics', classes: '8A, 9A', phone: '0300-1112233', email: 'ahmed@alshafique.edu.pk' },
    { id: 'T-002', name: 'Ms. Sara Ali', subject: 'English', classes: '6A, 7B', phone: '0301-2223344', email: 'sara@alshafique.edu.pk' },
    { id: 'T-003', name: 'Mr. Bilal Hussain', subject: 'Science', classes: '9A, 10A', phone: '0321-3334455', email: 'bilal@alshafique.edu.pk' },
    { id: 'T-004', name: 'Ms. Nadia Fatima', subject: 'Urdu', classes: 'All Primary', phone: '0333-4445566', email: 'nadia@alshafique.edu.pk' }
  ],
  notices: [
    { id: 1, title: 'Admission Open for Session 2026-27', category: 'Admission', date: '2026-09-01', content: 'Admissions are now open for Playgroup to Class 10. Limited seats available. Apply online or visit school office.' },
    { id: 2, title: 'Mid-Term Examinations Schedule', category: 'Exam', date: '2026-09-10', content: 'Mid-term exams will commence from 25th September 2026. Timetable will be shared with students soon.' },
    { id: 3, title: 'Eid Holiday Announcement', category: 'Holiday', date: '2026-09-05', content: 'School will remain closed from 12th to 15th September on account of Eid-ul-Fitr. Classes resume on 16th September.' },
    { id: 4, title: 'Parent-Teacher Meeting', category: 'Event', date: '2026-09-12', content: 'PTM for all classes will be held on 20th September 2026 from 9 AM to 1 PM. Parents are requested to attend.' }
  ],
  events: [
    { id: 1, title: 'Annual Sports Day', date: '2026-10-15', time: '8:00 AM', location: 'School Ground', type: 'Sports' },
    { id: 2, title: 'Annual Function & Prize Distribution', date: '2026-11-20', time: '10:00 AM', location: 'Main Hall', type: 'Function' },
    { id: 3, title: 'Parent-Teacher Meeting', date: '2026-09-20', time: '9:00 AM', location: 'Classrooms', type: 'Meeting' },
    { id: 4, title: 'Educational Trip to Historical Sites', date: '2026-10-05', time: '7:00 AM', location: 'Off Campus', type: 'Trip' },
    { id: 5, title: 'Science Exhibition', date: '2026-10-28', time: '9:00 AM', location: 'Science Lab', type: 'Academic' }
  ],
  fees: [
    { studentId: 'APS-2024-001', month: 'September 2026', amount: 3500, status: 'Paid', paidDate: '2026-09-05', receipt: 'RCPT-2026-001' },
    { studentId: 'APS-2024-001', month: 'August 2026', amount: 3500, status: 'Paid', paidDate: '2026-08-03', receipt: 'RCPT-2026-002' },
    { studentId: 'APS-2024-002', month: 'September 2026', amount: 3200, status: 'Pending', paidDate: null, receipt: null },
    { studentId: 'APS-2024-003', month: 'September 2026', amount: 3800, status: 'Paid', paidDate: '2026-09-02', receipt: 'RCPT-2026-003' }
  ],
  results: [
    { studentId: 'APS-2024-001', exam: 'Mid Term 2026', subjects: [
      { name: 'Mathematics', marks: 88, total: 100 },
      { name: 'English', marks: 82, total: 100 },
      { name: 'Science', marks: 90, total: 100 },
      { name: 'Urdu', marks: 85, total: 100 },
      { name: 'Islamiat', marks: 92, total: 100 }
    ], percentage: 87.4, grade: 'A', position: 3 }
  ],
  homework: [
    { id: 1, class: 'Class 8', subject: 'Mathematics', title: 'Exercise 5.2 - Algebra', due: '2026-09-20', teacher: 'Mr. Ahmed Khan' },
    { id: 2, class: 'Class 8', subject: 'English', title: 'Essay: My School', due: '2026-09-18', teacher: 'Ms. Sara Ali' },
    { id: 3, class: 'Class 9', subject: 'Science', title: 'Lab Report - Chemical Reactions', due: '2026-09-22', teacher: 'Mr. Bilal Hussain' }
  ],
  applications: []
};

// Generate application number
function generateAppNumber() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `APP-${year}-${num}`;
}

// Form validation helper
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  return valid;
}

// Init common
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  applyLang();
  initMobileNav();
  initStickyHeader();

  // Theme buttons
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Lang buttons
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLang);
  });
});

// Export for other scripts
window.SchoolApp = {
  login, logout, getSession, requireAuth, SAMPLE_DATA, generateAppNumber, validateForm, toggleTheme, toggleLang
};
