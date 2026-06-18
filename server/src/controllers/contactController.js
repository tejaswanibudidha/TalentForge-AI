import { validationResult } from 'express-validator';
import { saveContact } from '../services/contactService.js';
import { sendEmail } from '../utils/emailService.js';

export async function submitContact(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed.', errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  try {
    const savedContact = await saveContact({ name, email, subject, message });

    await sendEmail({
      to: 'talentforgeai@gmail.com',
      subject: 'New Contact Request from TalentForge AI',
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting TalentForge AI. Our team will get back to you shortly.',
      data: savedContact,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Contact submission failed:', error);
    return next(error);
  }
}
