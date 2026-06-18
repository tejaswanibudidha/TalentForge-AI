import mongoose from 'mongoose';
import Interview from '../models/Interview.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/emailService.js';

export async function scheduleInterview(req, res, next) {
  try {
    const recruiterId = req.user.id;
    const {
      candidateId,
      date,
      time,
      meetingLink,
      status = 'Scheduled',
    } = req.body;

    if (!candidateId || !date || !time || !meetingLink) {
      return res.status(400).json({
        success: false,
        message: 'candidateId, date, time, and meetingLink are required.',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).json({ success: false, message: 'Invalid candidateId.' });
    }

    const candidate = await User.findById(candidateId).select('fullName email');
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found.' });
    }

    const recruiter = await User.findById(recruiterId).select('fullName email');
    if (!recruiter) {
      return res.status(404).json({ success: false, message: 'Recruiter not found.' });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format.' });
    }

    const interview = await Interview.create({
      candidateId,
      recruiterId,
      date: parsedDate,
      time: time.trim(),
      meetingLink: meetingLink.trim(),
      status,
    });

    const formattedDate = parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const emailSubject = `Interview Invitation Scheduled for ${formattedDate} at ${time}`;
    const emailText = `Hello ${candidate.fullName || candidate.email},\n\n` +
      `You have been invited to an interview with ${recruiter.fullName || recruiter.email}.\n\n` +
      `Date: ${formattedDate}\n` +
      `Time: ${time}\n` +
      `Meeting Link: ${meetingLink}\n\n` +
      `Please join the interview at the scheduled time.\n\n` +
      `Best regards,\n${recruiter.fullName || 'Recruitment Team'}`;

    const emailHtml = `<p>Hello ${candidate.fullName || candidate.email},</p>` +
      `<p>You have been invited to an interview with <strong>${recruiter.fullName || recruiter.email}</strong>.</p>` +
      `<ul>` +
      `<li><strong>Date:</strong> ${formattedDate}</li>` +
      `<li><strong>Time:</strong> ${time}</li>` +
      `<li><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">Join Interview</a></li>` +
      `</ul>` +
      `<p>Please join at the scheduled time.</p>` +
      `<p>Best regards,<br/>${recruiter.fullName || 'Recruitment Team'}</p>`;

    await sendEmail({
      to: candidate.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    await sendEmail({
      to: recruiter.email,
      subject: `Interview Confirmation: ${formattedDate} at ${time}`,
      text: `Your interview with ${candidate.fullName || candidate.email} has been scheduled successfully.\n\n` +
        `Date: ${formattedDate}\nTime: ${time}\nMeeting Link: ${meetingLink}`,
      html: `<p>Your interview with <strong>${candidate.fullName || candidate.email}</strong> has been scheduled successfully.</p>` +
        `<ul>` +
        `<li><strong>Date:</strong> ${formattedDate}</li>` +
        `<li><strong>Time:</strong> ${time}</li>` +
        `<li><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">Join Interview</a></li>` +
        `</ul>`,
    });

    res.status(201).json({
      success: true,
      message: 'Interview scheduled and invitation email sent successfully.',
      data: interview,
    });
  } catch (error) {
    next(error);
  }
}

export async function getInterviewHistory(req, res, next) {
  try {
    const recruiterId = req.user.id;
    const interviews = await Interview.find({ recruiterId })
      .populate('candidateId', 'fullName email')
      .sort({ date: 1, time: 1 });

    res.json({
      success: true,
      message: 'Interview history retrieved successfully.',
      data: interviews,
    });
  } catch (error) {
    next(error);
  }
}
