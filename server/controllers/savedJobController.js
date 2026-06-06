import User from "../models/authModel.js";
import Job from "../models/jobModel.js";

/**
 * SAVE or UNSAVE a job
 * POST /api/saved-jobs/:jobId
 */
export const toggleSaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const jobId = req.params.jobId;

    const alreadySaved = user.savedJobs.includes(jobId);

    if (alreadySaved) {
      user.savedJobs = user.savedJobs.filter(
        (id) => id.toString() !== jobId
      );
      await user.save();
      return res.json({ message: "Job removed from saved jobs" });
    } else {
      user.savedJobs.push(jobId);
      await user.save();
      return res.json({ message: "Job saved successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET saved job IDs (AuthContext ke liye)
 * GET /api/saved-jobs/ids
 */
export const getSavedJobIds = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET saved jobs (FULL DATA)
 * GET /api/saved-jobs
 */
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedJobs");
    res.json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
