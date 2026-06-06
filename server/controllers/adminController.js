import User from "../models/authModel.js";
import Job from "../models/jobModel.js";
import Application from "../models/applicationModel.js";

/**
 * ADMIN STATS
 */
export const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEmployers = await User.countDocuments({ role: "employer" });
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: "active" });
    const totalApplications = await Application.countDocuments();

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const newJobsThisWeek = await Job.countDocuments({
      createdAt: { $gte: lastWeek },
    });

    const applicationsThisWeek = await Application.countDocuments({
      createdAt: { $gte: lastWeek },
    });

    res.json({
      totalUsers,
      totalJobs,
      totalEmployers,
      totalApplications,
      activeJobs,
      newJobsThisWeek,
      applicationsThisWeek,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL USERS (ADMIN)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    const formatted = users.map((u) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      companyName: u.companyName,
      status: u.isActive ? "active" : "inactive",
      joined: u.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};


/**
 * DELETE USER (ADMIN)
 */
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL JOBS (ADMIN)
 */
export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name companyName")
      .sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

/**
 * TOGGLE JOB STATUS (ADMIN)
 */
export const toggleJobStatusAdmin = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    job.status = job.status === "active" ? "inactive" : "active";
    await job.save();

    res.json(job);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE JOB (ADMIN)
 */
export const deleteJobAdmin = async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted by admin" });
  } catch (error) {
    next(error);
  }
};
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: "User status updated",
      isActive: user.isActive,
    });
  } catch (error) {
    next(error);
  }
};
export const changeUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!["jobseeker", "employer", "admin"].includes(role)) {
      res.status(400);
      throw new Error("Invalid role");
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.role = role;
    user.isAdmin = role === "admin";
    await user.save();

    res.json({
      message: "User role updated",
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
