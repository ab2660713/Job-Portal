# JobPortal - Modern Job Portal Frontend

A fully responsive, feature-rich job portal frontend built with React, React Router, and CSS. This application provides a complete job search and recruitment platform with separate interfaces for job seekers, employers, and administrators.

## Features

### For Job Seekers
- Browse and search jobs with advanced filters
- Save favorite jobs for later
- Apply to jobs with cover letter and resume
- Track application status
- Manage profile and resume
- View applied and saved jobs

### For Employers
- Post new job openings
- Manage job postings (edit, activate/deactivate, delete)
- View and manage job applicants
- Shortlist or reject candidates
- Company profile management

### For Administrators
- Dashboard with system statistics
- Manage all users (job seekers and employers)
- Manage all job postings
- View system analytics and activity logs

## Technology Stack

- **React 18.3** - UI library
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **CSS Modules** - Styling
- **Vite** - Build tool and dev server

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   ├── SearchBar.jsx
│   ├── FilterSidebar.jsx
│   ├── DashboardSidebar.jsx
│   └── Modal.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Jobs.jsx
│   ├── JobDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Admin.jsx
│   └── dashboard/     # Dashboard pages
│       ├── JobSeekerDashboard.jsx
│       ├── JobSeekerProfile.jsx
│       ├── AppliedJobs.jsx
│       ├── SavedJobs.jsx
│       ├── Resume.jsx
│       ├── EmployerDashboard.jsx
│       ├── EmployerProfile.jsx
│       ├── PostJob.jsx
│       ├── ManageJobs.jsx
│       └── Applicants.jsx
├── context/           # React Context
│   └── AuthContext.jsx
├── data/              # Mock data
│   ├── mockJobs.js
│   └── mockUsers.js
├── App.jsx            # Main app component
├── App.css
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Demo Credentials

### Job Seeker Account
- Email: `john.doe@email.com`
- Password: `demo123`

### Employer Account
- Email: `sarah@techcorp.com`
- Password: `demo123`

### Admin Account
- Email: `admin@jobportal.com`
- Password: `demo123`

## Pages and Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero section and featured jobs |
| `/jobs` | Job listings with search and filters |
| `/jobs/:id` | Individual job details |
| `/login` | Login page with role selection |
| `/register` | Registration page for job seekers and employers |
| `/dashboard/jobseeker` | Job seeker dashboard and profile |
| `/dashboard/jobseeker/applied` | Applied jobs list |
| `/dashboard/jobseeker/saved` | Saved jobs list |
| `/dashboard/jobseeker/resume` | Resume management |
| `/dashboard/employer` | Employer dashboard and company profile |
| `/dashboard/employer/post-job` | Post new job form |
| `/dashboard/employer/manage-jobs` | Manage posted jobs |
| `/dashboard/employer/applicants` | View and manage applicants |
| `/admin` | Admin panel with statistics and management |

## Key Features Implementation

### Authentication
- Role-based authentication (Job Seeker, Employer, Admin)
- Persistent login using localStorage
- Protected routes for authenticated users

### Job Search & Filtering
- Keyword and location search
- Multi-select filters for job type, experience, location, and category
- Pagination for job listings
- Save and unsave jobs functionality

### Dashboard Features
- Personalized dashboards for each user role
- Profile management with editable fields
- Job application tracking with status updates
- Resume upload and management
- Job posting and applicant management for employers

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly interface
- Collapsible navigation for mobile

## Design Highlights

- Modern gradient color scheme
- Card-based layouts
- Smooth hover effects and transitions
- Professional typography
- Consistent spacing and alignment
- Accessible color contrasts
- Loading states and empty states
- Form validation and error messages

## Data Management

The application uses mock data stored in:
- `src/data/mockJobs.js` - Job listings and categories
- `src/data/mockUsers.js` - User profiles, applications, and statistics

All data is managed through React state and Context API for global state management.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for backend integration:
- Real API integration
- User authentication with JWT
- File upload for resumes
- Email notifications
- Real-time application status updates
- Advanced search with Elasticsearch
- Payment integration for job postings
- Analytics dashboard
- Chat messaging between employers and candidates

## License

This project is created for demonstration purposes.

## Notes

- This is a frontend-only application with no backend
- All data is mock data and stored in the browser's localStorage
- No actual API calls are made
- File uploads are simulated (no actual files are stored)
- Authentication is simulated for demo purposes
