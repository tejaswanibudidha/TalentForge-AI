import Notification from '../models/Notification.js';

export async function getNotifications(req, res, next) {
  try {
    const userId = req.user.id;
    const { limit = 50, skip = 0 } = req.query;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Math.min(100, Number(limit)));

    res.json({ success: true, data: notifications });
  } catch (err) {
    next(err);
  }
}

export async function markNotificationsRead(req, res, next) {
  try {
    const userId = req.user.id;
    const { ids } = req.body;

    if (Array.isArray(ids) && ids.length > 0) {
      // validate objectIds are strings
      const result = await Notification.updateMany(
        { _id: { $in: ids }, userId },
        { $set: { isRead: true } }
      );

      return res.json({ success: true, modifiedCount: result.modifiedCount });
    }

    // Mark all unread notifications for the user as read
    const result = await Notification.updateMany({ userId, isRead: false }, { $set: { isRead: true } });
    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    next(err);
  }
}
