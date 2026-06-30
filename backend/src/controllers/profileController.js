import User from '../models/User.js';

export async function getProfile(req, res, next) {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}
