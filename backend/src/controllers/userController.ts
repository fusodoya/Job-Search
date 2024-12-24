import { Request, Response } from "express";
import User from "../models/userModel";
import UserInfo from "../models/userInfoModel";

// Get user
const getUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;
    const user = await User.findById(userID).select("-password");
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(
      userID,
      { $set: updateData },
      { new: true }
    );
    if (user) {
      res.status(200).json({ message: "User updated successfully", user });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;
    const user = await User.findByIdAndDelete(userID);
    if (user) {
      await UserInfo.findOneAndDelete({ user_id: userID });
      res.status(200).json({
        message: "User and corresponding user info deleted successfully",
        user,
      });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Create user info
const createUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID, ...userInfoData } = req.body;
    const userInfo = new UserInfo({
      user_id: userID,
      ...userInfoData,
    });
    await userInfo.save();
    res
      .status(201)
      .json({ message: "User info created successfully", userInfo });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
  // Update user
  const updateUser = async (req: Request, res: Response) => {
    try {
      const { userID, ...updateData } = req.body;
      const user = await User.findByIdAndUpdate(
        userID,
        { $set: updateData },
        { new: true }
      );
      if (user) {
        res.status(200).json({ message: "User updated successfully", user });
      } else {
        res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };
};

// Get user info
const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID }).populate(
      "user_id"
    );
    if (userInfo) {
      res.status(200).json({ userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info
const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID, ...updateData } = req.body;
    console.log(updateData);
    const userInfo = await UserInfo.findOneAndUpdate(
      { user_id: userID },
      { $set: updateData },
      { new: true }
    );
    if (userInfo) {
      res
        .status(200)
        .json({ message: "User info updated successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete user info
const deleteUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;
    const userInfo = await UserInfo.findOneAndDelete({ user_id: userID });
    if (userInfo) {
      res
        .status(200)
        .json({ message: "User info deleted successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: short_bio
const updateShortBio = async (req: Request, res: Response) => {
  try {
    const { userID, short_bio } = req.body;
    const userInfo = await UserInfo.findOneAndUpdate(
      { user_id: userID },
      { $set: { short_bio } },
      { new: true }
    );
    if (userInfo) {
      res
        .status(200)
        .json({ message: "Short bio updated successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: profile_picture
const updateProfilePicture = async (req: Request, res: Response) => {
  try {
    const { userID, profile_picture } = req.body;
    const userInfo = await UserInfo.findOneAndUpdate(
      { user_id: userID },
      { $set: { profile_picture } },
      { new: true }
    );
    if (userInfo) {
      res
        .status(200)
        .json({ message: "Profile picture updated successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: summary
const updateSummary = async (req: Request, res: Response) => {
  try {
    const { userID, summary } = req.body;
    const userInfo = await UserInfo.findOneAndUpdate(
      { user_id: userID },
      { $set: { summary } },
      { new: true }
    );
    if (userInfo) {
      res
        .status(200)
        .json({ message: "Summary updated successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: ready_to_work
const updateReadyToWork = async (req: Request, res: Response) => {
  try {
    const { userID, ready_to_work } = req.body;
    const userInfo = await UserInfo.findOneAndUpdate(
      { user_id: userID },
      { $set: { ready_to_work } },
      { new: true }
    );
    if (userInfo) {
      res
        .status(200)
        .json({ message: "Ready to work updated successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add review
const addReview = async (req: Request, res: Response) => {
  try {
    const { userID, reviewData } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.review.push(reviewData);
      await userInfo.save();
      res.status(200).json({ message: "Review added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Edit review
const editReview = async (req: Request, res: Response) => {
  try {
    const { userID, reviewData } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const reviewIndex = userInfo.review.findIndex(
        (review) => review._id === reviewData._id
      );
      if (reviewIndex !== -1) {
        userInfo.review[reviewIndex] = reviewData;
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Review edited successfully", userInfo });
      } else {
        res.status(400).json({ message: "Review not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete review
const deleteReview = async (req: Request, res: Response) => {
  try {
    const { userID, reviewID } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const reviewIndex = userInfo.review.findIndex(
        (review) => review._id === reviewID
      );
      if (reviewIndex !== -1) {
        userInfo.review.splice(reviewIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Review deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Review not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add education
const addEducation = async (req: Request, res: Response) => {
  try {
    const { userID, educationData } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.education.push(educationData);
      await userInfo.save();
      res
        .status(200)
        .json({ message: "Education added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Edit education
const editEducation = async (req: Request, res: Response) => {
  try {
    const { userID, educationData } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const educationIndex = userInfo.education.findIndex(
        (education) => education._id === educationData._id
      );
      if (educationIndex !== -1) {
        userInfo.education[educationIndex] = educationData;
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Education edited successfully", userInfo });
      } else {
        res.status(400).json({ message: "Education not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete education
const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { userID, educationID } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const educationIndex = userInfo.education.findIndex(
        (education) => education._id === educationID
      );
      if (educationIndex !== -1) {
        userInfo.education.splice(educationIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Education deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Education not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
// Update user info: Add experience
const addExperience = async (req: Request, res: Response) => {
  try {
    const { userID, experienceData } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.experience.push(experienceData);
      await userInfo.save();
      res
        .status(200)
        .json({ message: "Experience added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
// Update user info: Edit experience
const editExperience = async (req: Request, res: Response) => {
  try {
    const { userID, experienceData } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const experienceIndex = userInfo.experience.findIndex(
        (experience) => experience._id === experienceData._id
      );
      if (experienceIndex !== -1) {
        userInfo.experience[experienceIndex] = experienceData;
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Experience edited successfully", userInfo });
      } else {
        res.status(400).json({ message: "Experience not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
// Update user info: Delete experience
const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { userID, experienceID } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const experienceIndex = userInfo.experience.findIndex(
        (experience) => experience._id === experienceID
      );
      if (experienceIndex !== -1) {
        userInfo.experience.splice(experienceIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Experience deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Experience not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add skill
const addSkill = async (req: Request, res: Response) => {
  try {
    const { userID, skill } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.skills.push(skill);
      await userInfo.save();
      res.status(200).json({ message: "Skill added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
// Update user info: Delete skill
const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { userID, skill } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      const skillIndex = userInfo.skills.indexOf(skill);
      if (skillIndex !== -1) {
        userInfo.skills.splice(skillIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Skill deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Skill not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
// Update user info: Add certification
const addCertification = async (req: Request, res: Response) => {
  try {
    const { userID, certification } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.certifications.push(certification);
      await userInfo.save();
      res
        .status(200)
        .json({ message: "Certification added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete certification
const deleteCertification = async (req: Request, res: Response) => {
  try {
    const { userID, certification } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      const certificationIndex = userInfo.certifications.indexOf(certification);
      if (certificationIndex !== -1) {
        userInfo.certifications.splice(certificationIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Certification deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Certification not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add Job Preference
const addJobPreference = async (req: Request, res: Response) => {
  try {
    const { userID, jobPreference } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.job_preferences.push(jobPreference);
      await userInfo.save();
      res
        .status(200)
        .json({ message: "Job preference added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Edit Job Preference
const editJobPreference = async (req: Request, res: Response) => {
  try {
    const { userID, jobPreference } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const jobPreferenceIndex = userInfo.job_preferences.findIndex(
        (jobPreference) => jobPreference._id === jobPreference._id
      );
      if (jobPreferenceIndex !== -1) {
        userInfo.job_preferences[jobPreferenceIndex] = jobPreference;
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Job preference edited successfully", userInfo });
      } else {
        res.status(400).json({ message: "Job preference not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete Job Preference
const deleteJobPreference = async (req: Request, res: Response) => {
  try {
    const { userID, jobPreferenceID } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const jobPreferenceIndex = userInfo.job_preferences.findIndex(
        (jobPreference) => jobPreference._id === jobPreferenceID
      );
      if (jobPreferenceIndex !== -1) {
        userInfo.job_preferences.splice(jobPreferenceIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Job preference deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Job preference not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add award
const addAward = async (req: Request, res: Response) => {
  try {
    const { userID, award } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.awards.push(award);
      await userInfo.save();
      res.status(200).json({ message: "Award added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
// Update user info: Delete award
const deleteAward = async (req: Request, res: Response) => {
  try {
    const { userID, award } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const awardIndex = userInfo.awards.indexOf(award);
      if (awardIndex !== -1) {
        userInfo.awards.splice(awardIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Award deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Award not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add language
const addLanguage = async (req: Request, res: Response) => {
  try {
    const { userID, language } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      userInfo.languages.push(language);
      await userInfo.save();
      res
        .status(200)
        .json({ message: "Language added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete language
const deleteLanguage = async (req: Request, res: Response) => {
  try {
    const { userID, language } = req.body;
    const userInfo = await UserInfo.findOne({ user_id: userID });
    if (userInfo) {
      const languageIndex = userInfo.languages.indexOf(language);
      if (languageIndex !== -1) {
        userInfo.languages.splice(languageIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Language deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Language not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add link
const addLink = async (req: Request, res: Response) => {
  try {
    const { userID, link } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      userInfo.link.push(link);
      await userInfo.save();
      res.status(200).json({ message: "Link added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete link
const deleteLink = async (req: Request, res: Response) => {
  try {
    const { userID, link } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      const linkIndex = userInfo.link.indexOf(link);
      if (linkIndex !== -1) {
        userInfo.link.splice(linkIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Link deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Link not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add publication
const addPublication = async (req: Request, res: Response) => {
  try {
    const { userID, publication } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      userInfo.publications.push(publication);
      await userInfo.save();
      res
        .status(200)
        .json({ message: "Publication added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete publication
const deletePublication = async (req: Request, res: Response) => {
  try {
    const { userID, publication } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      const publicationIndex = userInfo.publications.indexOf(publication);
      if (publicationIndex !== -1) {
        userInfo.publications.splice(publicationIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Publication deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Publication not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Add qualification
const addQualification = async (req: Request, res: Response) => {
  try {
    const { userID, qualification } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      userInfo.qualifications.push(qualification);
      await userInfo.save();
      res
        .status(200)
        .json({ message: "Qualification added successfully", userInfo });
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update user info: Delete qualification
const deleteQualification = async (req: Request, res: Response) => {
  try {
    const { userID, qualification } = req.body;
    const userInfo = await UserInfo.findOne({
      user_id: userID,
    });
    if (userInfo) {
      const qualificationIndex = userInfo.qualifications.indexOf(qualification);
      if (qualificationIndex !== -1) {
        userInfo.qualifications.splice(qualificationIndex, 1);
        await userInfo.save();
        res
          .status(200)
          .json({ message: "Qualification deleted successfully", userInfo });
      } else {
        res.status(400).json({ message: "Qualification not found" });
      }
    } else {
      res.status(400).json({ message: "User info not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export {
  getUser,
  updateUser,
  deleteUser,
  createUserInfo,
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  updateShortBio,
  updateProfilePicture,
  updateSummary,
  updateReadyToWork,
  addReview,
  editReview,
  deleteReview,
  addEducation,
  editEducation,
  deleteEducation,
  addExperience,
  editExperience,
  deleteExperience,
  addSkill,
  deleteSkill,
  addCertification,
  deleteCertification,
  addJobPreference,
  editJobPreference,
  deleteJobPreference,
  addAward,
  deleteAward,
  addLanguage,
  deleteLanguage,
  addLink,
  deleteLink,
  addPublication,
  deletePublication,
  addQualification,
  deleteQualification,
};
