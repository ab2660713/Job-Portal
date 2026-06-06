import Job from "../models/jobModel.js";
import User from "../models/authModel.js";

/**
 * GET home page stats
 * GET /api/stats/home
 */
export const getHomeStats = async (req, res) => {
  try {
    const activeJobs = await Job.countDocuments({ status: "active" });
    const companies = await User.countDocuments({ role: "employer" });
    const jobSeekers = await User.countDocuments({ role: "jobseeker" });

    res.json({
      activeJobs,
      companies,
      jobSeekers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
