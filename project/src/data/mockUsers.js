export const mockUsers = {
  jobSeeker: {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    role: "jobseeker",
    phone: "+1 234-567-8900",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    experience: "5 years",
    skills: ["React", "JavaScript", "HTML/CSS", "Node.js", "Git"],
    education: "Bachelor's in Computer Science",
    resume: null,
    savedJobs: [1, 3, 5],
    appliedJobs: [
      {
        jobId: 1,
        appliedDate: "2024-01-15",
        status: "Under Review",
        company: "TechCorp Solutions"
      },
      {
        jobId: 2,
        appliedDate: "2024-01-10",
        status: "Shortlisted",
        company: "InnovateTech Inc"
      },
      {
        jobId: 4,
        appliedDate: "2024-01-05",
        status: "Rejected",
        company: "DataVision Analytics"
      }
    ],
    profileComplete: 75
  },
  employer: {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@techcorp.com",
    role: "employer",
    companyName: "TechCorp Solutions",
    companySize: "100-500 employees",
    industry: "Technology",
    website: "www.techcorp.com",
    phone: "+1 234-567-8901",
    location: "San Francisco, CA",
    description: "Leading technology solutions provider specializing in web and mobile applications.",
    postedJobs: [1, 6],
    companyLogo: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=100"
  },
  admin: {
    id: 3,
    name: "Admin User",
    email: "admin@jobportal.com",
    role: "admin"
  }
};

export const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Senior Frontend Developer",
    applicantName: "Michael Chen",
    applicantEmail: "michael.chen@email.com",
    appliedDate: "2024-01-20",
    status: "Under Review",
    resume: "michael_chen_resume.pdf",
    coverLetter: "I am very interested in this position...",
    experience: "6 years",
    expectedSalary: "$140k"
  },
  {
    id: 2,
    jobId: 1,
    jobTitle: "Senior Frontend Developer",
    applicantName: "Emily Rodriguez",
    applicantEmail: "emily.r@email.com",
    appliedDate: "2024-01-18",
    status: "Shortlisted",
    resume: "emily_rodriguez_resume.pdf",
    coverLetter: "With 5 years of React experience...",
    experience: "5 years",
    expectedSalary: "$130k"
  },
  {
    id: 3,
    jobId: 1,
    jobTitle: "Senior Frontend Developer",
    applicantName: "David Kim",
    applicantEmail: "david.kim@email.com",
    appliedDate: "2024-01-15",
    status: "Interviewed",
    resume: "david_kim_resume.pdf",
    coverLetter: "I have been working with modern frontend technologies...",
    experience: "7 years",
    expectedSalary: "$150k"
  },
  {
    id: 4,
    jobId: 6,
    jobTitle: "DevOps Engineer",
    applicantName: "Jessica Lee",
    applicantEmail: "jessica.lee@email.com",
    appliedDate: "2024-01-22",
    status: "Under Review",
    resume: "jessica_lee_resume.pdf",
    coverLetter: "As a DevOps engineer with AWS expertise...",
    experience: "4 years",
    expectedSalary: "$125k"
  }
];

export const mockStats = {
  totalJobs: 1247,
  activeJobs: 892,
  totalApplications: 5634,
  totalUsers: 3421,
  totalEmployers: 156,
  newJobsThisWeek: 45,
  applicationsThisWeek: 234
};
