# JobPortal - Folder Structure Explanation

This document explains the organization and purpose of each folder and file in the JobPortal project.

## Root Directory

```
project/
├── dist/                    # Production build output (generated)
├── node_modules/            # Dependencies (generated)
├── public/                  # Static assets
├── src/                     # Source code
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── PROJECT_README.md       # Project documentation
└── FOLDER_STRUCTURE.md     # This file
```

## Source Directory (`src/`)

### Components (`src/components/`)
Reusable UI components used across multiple pages.

**Navbar.jsx / Navbar.css**
- Top navigation bar with logo and menu
- Role-based menu items (changes based on logged-in user)
- Mobile responsive hamburger menu
- User profile display when logged in

**Footer.jsx / Footer.css**
- Bottom footer with links and social media icons
- Multi-column layout with company info
- Responsive grid layout

**JobCard.jsx / JobCard.css**
- Displays individual job listing
- Shows job title, company, location, salary, etc.
- Save/unsave job functionality
- Hover effects and animations

**SearchBar.jsx / SearchBar.css**
- Search input for keywords and location
- Used on home page and jobs page
- Clean, modern design with icons

**FilterSidebar.jsx / FilterSidebar.css**
- Job filtering options (type, experience, location, category)
- Multi-select checkboxes
- Clear all filters functionality
- Sticky positioning on scroll

**DashboardSidebar.jsx / DashboardSidebar.css**
- Navigation sidebar for dashboard pages
- Different links for job seeker vs employer
- Active link highlighting
- Responsive mobile layout

**Modal.jsx / Modal.css**
- Reusable modal/dialog component
- Used for job applications and other forms
- Click outside to close
- Smooth fade-in animation

### Pages (`src/pages/`)
Full-page components representing different routes.

**Home.jsx / Home.css**
- Landing page with hero section
- Search bar with job/location inputs
- Featured jobs grid
- Popular categories
- Features section
- Call-to-action section
- Statistics display

**Jobs.jsx / Jobs.css**
- Job listings page
- Search bar at top
- Filter sidebar on left
- Job cards grid on right
- Pagination at bottom
- Empty state when no results

**JobDetails.jsx / JobDetails.css**
- Individual job detail page
- Full job description
- Requirements and responsibilities lists
- Benefits list
- Company information sidebar
- Apply button with modal form
- Save job functionality

**Login.jsx / Auth.css**
- Login form with role selection
- Email and password inputs
- Demo login buttons
- Link to registration page
- Form validation

**Register.jsx / Auth.css**
- Registration form with role selection
- Different fields for job seeker vs employer
- Form validation
- Password confirmation
- Link to login page

**Admin.jsx / Admin.css**
- Admin panel with tabs
- Dashboard with statistics
- User management table
- Job management grid
- Activity log
- Charts and metrics

### Dashboard Pages (`src/pages/dashboard/`)
Protected pages for authenticated users.

**JobSeekerDashboard.jsx**
- Container for job seeker dashboard routes
- Includes sidebar navigation
- Nested routing for sub-pages

**JobSeekerProfile.jsx**
- Job seeker profile management
- Editable personal information
- Skills management
- Profile completion percentage
- Statistics cards

**AppliedJobs.jsx**
- List of jobs user has applied to
- Application status badges
- Date applied information
- Links to job details

**SavedJobs.jsx**
- Grid of saved/bookmarked jobs
- Uses JobCard component
- Empty state when no saved jobs

**Resume.jsx**
- Resume upload interface
- File preview
- Download and delete options
- Resume tips section

**EmployerDashboard.jsx**
- Container for employer dashboard routes
- Includes sidebar navigation
- Nested routing for sub-pages

**EmployerProfile.jsx**
- Company profile management
- Company information fields
- Contact person details
- Company description editor

**PostJob.jsx**
- Form to create new job posting
- Multiple input fields
- Job description textarea
- Requirements, responsibilities, benefits
- Form validation

**ManageJobs.jsx**
- List of employer's posted jobs
- Job statistics (views, applications)
- Activate/deactivate toggle
- Edit and delete actions
- Link to applicants

**Applicants.jsx**
- List of job applicants
- Filter by job and status
- View applicant details modal
- Shortlist/reject actions
- Application status management

**Dashboard.css**
- Shared styles for all dashboard pages
- Grid layouts
- Card styles
- Form styles
- Table styles
- Responsive breakpoints

### Context (`src/context/`)
React Context for global state management.

**AuthContext.jsx**
- Authentication state management
- User login/logout functions
- User data storage
- Saved jobs management
- Job save/unsave functions
- localStorage integration

### Data (`src/data/`)
Mock data for the application.

**mockJobs.js**
- Array of 12 sample job listings
- Job categories with counts
- Each job has: title, company, location, type, experience, salary, description, requirements, responsibilities, benefits, etc.

**mockUsers.js**
- Sample user profiles (job seeker, employer, admin)
- Applied jobs data with status
- Job applicants data
- System statistics

### Main Files (`src/`)

**App.jsx**
- Main application component
- Router setup
- AuthProvider wrapper
- Routes definition
- Layout structure (Navbar, main content, Footer)

**App.css**
- Basic app layout styles
- Flex container for full-height layout

**main.jsx**
- Application entry point
- React root rendering
- StrictMode wrapper

**index.css**
- Global CSS reset
- Typography styles
- Default button and input styles
- Container utility class

## Configuration Files

**package.json**
- Project metadata
- Dependencies list
- Scripts (dev, build, lint, preview)
- Development dependencies

**vite.config.js**
- Vite build configuration
- React plugin setup
- Development server settings

**eslint.config.js**
- ESLint rules
- React-specific linting
- Code quality enforcement

**index.html**
- HTML template
- Root div element
- Script tag for main.jsx
- Meta tags

## Design Patterns Used

### Component Organization
- **Container/Presentational Pattern**: Dashboard components act as containers, routing to specific presentational components
- **Composition**: Modal and Card components are reusable and composable
- **Prop Drilling Prevention**: Context API used for auth state instead of prop drilling

### Routing Structure
- **Nested Routes**: Dashboard uses nested routing for cleaner organization
- **Protected Routes**: Authentication check in components (can be enhanced with route guards)
- **Dynamic Routes**: Job details uses `:id` parameter

### State Management
- **Local State**: useState for component-specific state
- **Global State**: Context API for authentication and saved jobs
- **Persistent State**: localStorage for maintaining login state across sessions

### CSS Organization
- **Co-located Styles**: Each component has its own CSS file
- **Shared Styles**: Common styles in index.css and App.css
- **Responsive Design**: Mobile-first approach with media queries

### File Naming
- **Components**: PascalCase (e.g., JobCard.jsx)
- **Utilities**: camelCase (e.g., mockJobs.js)
- **Styles**: Same name as component (e.g., JobCard.css)

## Best Practices Followed

1. **Component Reusability**: JobCard, Modal, SearchBar used in multiple places
2. **Consistent Naming**: Clear, descriptive names for all files and functions
3. **Separation of Concerns**: Logic, presentation, and data separated
4. **DRY Principle**: Reusable components avoid code duplication
5. **Responsive Design**: All pages work on mobile, tablet, and desktop
6. **Accessibility**: Semantic HTML, proper form labels, keyboard navigation
7. **Performance**: Code splitting with React Router, optimized images
8. **Maintainability**: Clear folder structure, organized by feature

## Adding New Features

### To add a new page:
1. Create component in `src/pages/`
2. Create corresponding CSS file
3. Add route in `App.jsx`
4. Add navigation link in Navbar

### To add a new dashboard page:
1. Create component in `src/pages/dashboard/`
2. Add route in respective Dashboard component
3. Add link in DashboardSidebar
4. Use shared Dashboard.css for styling

### To add new mock data:
1. Add data to `src/data/mockJobs.js` or `mockUsers.js`
2. Import and use in relevant components
3. Update Context if needed for global access
