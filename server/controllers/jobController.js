import Job from "../models/jobModel.js";
import User from "../models/authModel.js";

const normalizeList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value !== "string") return [];
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getQueryValues = (query, key) => {
  const value = query[key] ?? query[`${key}[]`];
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }

    const {
      title,
      category,
      type,
      location,
      experience,
      salary,
      description,
      requirements,
      responsibilities,
      benefits,
    } = req.body;

    const job = await Job.create({
      title,
      category,
      type,
      location,
      experience,
      salary,
      description,

      requirements: normalizeList(requirements),
      responsibilities: normalizeList(responsibilities),
      benefits: normalizeList(benefits),

      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ status: "active" })
    .populate("createdBy", "name companyName")
    .sort({ createdAt: -1 });
  res.json(jobs);
};

export const getJobById = async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate("createdBy", "name companyName website description");
  

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const fields = [
      "title",
      "category",
      "type",
      "location",
      "experience",
      "salary",
      "description",
      "status",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    ["requirements", "responsibilities", "benefits"].forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = normalizeList(req.body[field]);
      }
    });

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET employer posted jobs
 * GET /api/jobs/my
 */
export const getMyJobs = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const jobs = await Job.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * PATCH job status
 * PATCH /api/jobs/:id/status
 */
export const toggleJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    job.status = job.status === "active" ? "inactive" : "active";
    await job.save();

    res.json({
      message: "Job status updated",
      status: job.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * DELETE job
 * DELETE /api/jobs/:id
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * GET featured jobs (Home page)
 * GET /api/jobs/featured
 */
export const getFeaturedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "active" })
      .populate("createdBy", "name companyName")
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * SEARCH jobs
 * GET /api/jobs/search
 */
/**
 * ADVANCED JOB SEARCH (Jobs page)
 * GET /api/jobs/search
 */
export const searchJobs = async (req, res) => {
  try {
    const {
      keyword,
      page = 1,
      limit = 9,
    } = req.query;

    const query = { status: "active" };
    const locations = getQueryValues(req.query, "location");
    const categories = getQueryValues(req.query, "category");
    const types = getQueryValues(req.query, "jobType");
    const experiences = getQueryValues(req.query, "experience");

    // 🔍 keyword search
    if (keyword?.trim()) {
      const keywordRegex = { $regex: escapeRegex(keyword.trim()), $options: "i" };
      const matchedCompanies = await User.find({
        $or: [{ companyName: keywordRegex }, { name: keywordRegex }],
      }).select("_id");
      query.$or = [
        { title: keywordRegex },
        { category: keywordRegex },
        { type: keywordRegex },
        { location: keywordRegex },
        { description: keywordRegex },
        { createdBy: { $in: matchedCompanies.map((user) => user._id) } },
      ];
    }

    // 📍 location
    if (locations.length > 0) {
      query.location = {
        $regex: locations.map(escapeRegex).join("|"),
        $options: "i",
      };
    }

    // 🏷️ category (single or array)
    if (categories.length > 0) {
      query.category = {
        $regex: categories.map(escapeRegex).join("|"),
        $options: "i",
      };
    }

    // 💼 job type
    if (types.length > 0) {
      query.type = {
        $regex: types.map(escapeRegex).join("|"),
        $options: "i",
      };
    }

    // 🎓 experience (basic match)
    if (experiences.length > 0) {
      query.experience = {
        $regex: experiences.map(escapeRegex).join("|"),
        $options: "i",
      };
    }

    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.max(Number(limit) || 9, 1);
    const skip = (safePage - 1) * safeLimit;

    const jobs = await Job.find(query)
      .populate("createdBy", "name companyName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit);

    const totalJobs = await Job.countDocuments(query);

    res.json({
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / safeLimit),
      currentPage: safePage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET job categories with counts
 * GET /api/jobs/categories
 */
export const getJobCategories = async (req, res) => {
  try {
    const categories = await Job.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
