import Application from "../models/applicationModel.js";
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
      const jobId = req.params.jobId; 
      const { coverLetter, expectedSalary, availableFrom } = req.body;
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
      .populate("applicant", "name email resume")
      .populate("job", "title createdBy");

    // Frontend-friendly response
    const formatted = applications.map((app) => ({
      id: app._id,
      applicantName: app.applicant.name,
      applicantEmail: app.applicant.email,
      jobTitle: app.job.title,
      appliedDate: app.createdAt,
      experience: app.experience,
      expectedSalary: app.expectedSalary,
      status: app.status,
      coverLetter: app.coverLetter,
      resume: app.applicant.resume?.originalName || app.resume,
      resumeDownloadUrl: app.applicant.resume?.filename
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
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = req.body.status;
    await application.save();

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
