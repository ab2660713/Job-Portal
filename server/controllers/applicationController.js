import Application from "../models/applicationModel.js";
import Notification from "../models/notificationModel.js";
import Job from "../models/jobModel.js";
import fs from "fs";
import path from "path";

const legacyResumeDir = path.resolve("server/uploads/resumes");

/**
 * Jobseeker applies for job
 * POST /api/applications
 */
/**
 * Jobseeker - Get my applied jobs
 * GET /api/applications/my
 */
export const getMyApplications = async (req, res) => {
    try {
      const applications = await Application.find({
        applicant: req.user._id,
      })
        .populate({
          path: "job",
          select: "title createdBy",
          populate: { path: "createdBy", select: "companyName name" },
        })
        .sort({ createdAt: -1 });
  
      const formatted = applications.map((app) => ({
        jobId: app.job._id,
        jobTitle: app.job.title,
        company: app.job.createdBy?.companyName || app.job.createdBy?.name || "Company",
        status: app.status,
        appliedDate: app.createdAt,
      }));
  
      res.json(formatted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const applyForJob = async (req, res) => {
    try {
      if (req.user.role !== "jobseeker") {
        return res.status(403).json({
          message: "Only job seekers can apply for jobs",
        });
      }

      const jobId = req.params.jobId;
      const { coverLetter, expectedSalary, availableFrom } = req.body;

      const missingFields = [];
      if (!req.user.title) missingFields.push("Professional Title");
      if (!req.user.experience) missingFields.push("Experience");
      if (!req.user.skills || req.user.skills.length === 0) missingFields.push("Skills");
      if (!req.user.resume || !req.user.resume.data) missingFields.push("Resume");
      if (!req.user.phone) missingFields.push("Phone");
      if (!req.user.location) missingFields.push("Location");

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Please complete your profile before applying. Missing: ${missingFields.join(", ")}`,
          incompleteProfile: true,
          missingFields,
        });
      }

      const alreadyApplied = await Application.findOne({
        job: jobId,
        applicant: req.user._id,
      });

      if (alreadyApplied) {
        return res.status(400).json({
          message: "You have already applied to this job",
        });
      }
      const application = await Application.create({
        job: req.params.jobId,
        applicant: req.user._id,
        coverLetter,
        expectedSalary,
        availableFrom,
        resume: req.user.resume?.originalName || req.user.resume?.filename || null,
      });

      const job = await Job.findById(jobId);
      if (job) {
        await Notification.create({
          recipient: job.createdBy,
          sender: req.user._id,
          type: "new_application",
          title: "New Application Received",
          message: `${req.user.name} applied for "${job.title}"`,
          relatedJob: jobId,
          relatedApplication: application._id,
        });
      }

      res.status(201).json({
        message: "Application submitted successfully",
        application,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
/**
 * Employer gets all applicants for a job
 * GET /api/applications/job/:jobId
 */
export const getApplicantsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email resume phone location title experience skills")
      .populate("job", "title createdBy");

    const formatted = applications.map((app) => ({
      id: app._id,
      applicantName: app.applicant.name,
      applicantEmail: app.applicant.email,
      applicantPhone: app.applicant.phone,
      applicantLocation: app.applicant.location,
      applicantTitle: app.applicant.title,
      applicantExperience: app.applicant.experience,
      applicantSkills: app.applicant.skills || [],
      jobTitle: app.job.title,
      appliedDate: app.createdAt,
      expectedSalary: app.expectedSalary,
      availableFrom: app.availableFrom,
      status: app.status,
      coverLetter: app.coverLetter,
      resume: app.applicant.resume?.originalName || app.resume,
      resumeDownloadUrl: app.applicant.resume?.data
        ? `/api/applications/${app._id}/resume/download`
        : null,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Employer downloads applicant resume
 * GET /api/applications/:id/resume/download
 */
export const downloadApplicationResume = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("applicant", "resume")
      .populate("job", "createdBy");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const isOwner =
      application.job?.createdBy?.toString() === req.user._id.toString();
    const isApplicant =
      application.applicant?._id?.toString() === req.user._id.toString();

    if (!isOwner && !isApplicant && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const resume = application.applicant?.resume;
    if (!resume?.data && !resume?.filename) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.setHeader("Content-Type", resume.contentType || "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(
        resume.originalName || "resume.pdf"
      )}"`
    );
    if (resume.data) {
      return res.send(resume.data);
    }

    const legacyPath = path.join(legacyResumeDir, resume.filename);
    if (!fs.existsSync(legacyPath)) {
      return res.status(404).json({ message: "Resume file not found" });
    }

    res.sendFile(legacyPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Employer updates application status
 * PATCH /api/applications/:id/status
 */
export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("job", "title");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const oldStatus = application.status;
    application.status = req.body.status;
    await application.save();

    const statusTypeMap = {
      Shortlisted: "application_shortlisted",
      Rejected: "application_rejected",
      Interviewed: "application_interviewed",
    };

    const notifType = statusTypeMap[req.body.status];
    if (notifType) {
      await Notification.create({
        recipient: application.applicant,
        sender: req.user._id,
        type: notifType,
        title: `Application ${req.body.status}`,
        message: `Your application for "${application.job.title}" has been ${req.body.status.toLowerCase()}`,
        relatedJob: application.job._id,
        relatedApplication: application._id,
      });
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
