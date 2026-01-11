import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // FIX 1: Use req.auth() as a function (fixes the deprecation warning)
   const userId = req.auth.userId || req.auth().userId;

    if (!userId) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(userId);

    // FIX 2: Check if user exists in MongoDB before proceeding
    if (!user) {
      return res.json({ success: false, message: "User not found in database. Please check your Webhooks or seed the user." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};