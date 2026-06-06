import User from "../models/authModel.js";
import fs from "fs";
import path from "path";

const legacyResumeDir = path.resolve("server/uploads/resumes");

const toResumeInfo = (resume) => {
  if (!resume?.filename) return null;

  return {
    filename: resume.filename,
    originalName: resume.originalName,
    size: resume.size,
    contentType: resume.contentType,
    uploadedAt: resume.uploadedAt,
  };
};

/**
 * UPLOAD resume
 * POST /api/resume
 */

export const uploadMyResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.resume = {
      filename: `${req.user._id}-${Date.now()}.pdf`,
      originalName: req.file.originalname,
      size: (req.file.size / 1024).toFixed(2) + " KB",
      contentType: req.file.mimetype,
      data: req.file.buffer,
      uploadedAt: new Date(),
    };

    await user.save();

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume: toResumeInfo(user.resume),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET resume info
 * GET /api/resume
 */
export const getMyResume = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user?.resume?.filename) {
    return res.status(404).json({ message: "No resume uploaded" });
  }

  res.json(toResumeInfo(user.resume));
};

/**
 * DOWNLOAD resume
 * GET /api/resume/download
 */
export const downloadMyResume = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user?.resume?.data && !user?.resume?.filename) {
    return res.status(404).json({ message: "No resume found" });
  }

  res.setHeader("Content-Type", user.resume.contentType || "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(
      user.resume.originalName || "resume.pdf"
    )}"`
  );

  if (user.resume.data) {
    return res.send(user.resume.data);
  }

  const legacyPath = path.join(legacyResumeDir, user.resume.filename);
  if (!fs.existsSync(legacyPath)) {
    return res.status(404).json({ message: "Resume file not found" });
  }

  res.sendFile(legacyPath);
};

/**
 * DELETE resume
 * DELETE /api/resume
 */
export const deleteMyResume = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user?.resume?.filename) {
    return res.status(404).json({ message: "No resume to delete" });
  }

  const legacyPath = path.join(legacyResumeDir, user.resume.filename);
  if (fs.existsSync(legacyPath)) fs.unlinkSync(legacyPath);

  user.resume = undefined;
  await user.save();

  res.json({ message: "Resume deleted successfully" });
};
