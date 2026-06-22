import Users from "../models/authModel.js";

/**
 * GET jobseeker profile
 * GET /api/users/profile
 */
export const getMyProfile = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).select("-password");

    const profileComplete = Math.min(
      100,
      Math.round(
        [
          user.phone,
          user.location,
          user.title,
          user.experience,
          user.skills && user.skills.length > 0,
          user.resume && user.resume.data,
        ].filter(Boolean).length / 6 * 100
      )
    );

    res.json({
      ...user.toObject(),
      profileComplete,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE jobseeker profile
 * PUT /api/users/profile
 */
export const updateMyProfile = async (req, res) => {
  try {
    const fields = [
      "name",
      "email",
      "phone",
      "location",
      "title",
      "experience",
      "skills",
    ];

    const user = await Users.findById(req.user._id);

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getEmployerProfile = async (req, res) => {
    try {
      if (req.user.role !== "employer") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const user = await Users.findById(req.user._id)
        .select("-password")
        .populate("postedJobs");
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  /**
   * UPDATE employer profile
   * PUT /api/users/employer/profile
   */
  export const updateEmployerProfile = async (req, res) => {
    try {
      if (req.user.role !== "employer") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const fields = [
        "companyName",
        "industry",
        "companySize",
        "website",
        "location",
        "phone",
        "description",
        "name",
        "email",
      ];
  
      const user = await Users.findById(req.user._id);
  
      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      });
  
      await user.save();
  
      res.json({
        message: "Employer profile updated successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
