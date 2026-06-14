import nodemailer from 'nodemailer';

const hasSmtpConfig = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.SMTP_FROM
);

let transporter = null;
if (hasSmtpConfig) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendEmail({ to, subject, text, html }) {
  // In development, skip actual SMTP sends to avoid hard failures.
  if (process.env.NODE_ENV !== 'production' || !hasSmtpConfig) {
    // Log the email payload for developer inspection and return early.
    // This prevents throwing errors when SMTP or environment variables are not configured.
    // If you need to test real email sending locally, set NODE_ENV=production and provide SMTP_* vars.
    // eslint-disable-next-line no-console
    console.warn('sendEmail: skipping send in development or missing SMTP config', { to, subject });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    // Log and rethrow so callers can handle it in production.
    // eslint-disable-next-line no-console
    console.error('sendEmail: failed to send email', err);
    throw err;
  }
}
