import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "contact@bzfamily.org";

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "admin@bzfamily.org";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendEventConfirmationEmail({
  to,
  firstName,
  eventTitle,
  eventDate,
  eventLocation,
}: {
  to: string;
  firstName: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Confirmation d'inscription — ${eventTitle}`,
    html: `
      <h1>Bonjour ${firstName},</h1>
      <p>Votre inscription à l'événement <strong>${eventTitle}</strong> est confirmée.</p>
      <p><strong>Date :</strong> ${eventDate}<br/>
      <strong>Lieu :</strong> ${eventLocation}</p>
      <p>À bientôt,<br/>L'équipe BZ Family</p>
    `,
  });
}

export async function sendVolunteerNotificationEmail({
  firstName,
  lastName,
  email,
  phone,
  availability,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  availability: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Nouvelle candidature bénévole — ${firstName} ${lastName}`,
    html: `
      <h1>Nouvelle candidature bénévole</h1>
      <p><strong>Nom :</strong> ${firstName} ${lastName}<br/>
      <strong>Email :</strong> ${email}<br/>
      <strong>Téléphone :</strong> ${phone}<br/>
      <strong>Disponibilités :</strong> ${availability}</p>
    `,
  });
}

export async function sendContactNotificationEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `Nouveau message contact — ${subject}`,
    html: `
      <h1>Nouveau message contact</h1>
      <p><strong>Nom :</strong> ${escapeHtml(name)}<br/>
      <strong>Email :</strong> ${escapeHtml(email)}<br/>
      <strong>Sujet :</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
    `,
  });
}

export async function sendDonationThankYouEmail({
  to,
  donorName,
  amount,
}: {
  to: string;
  donorName: string;
  amount: string;
}) {
  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Merci pour votre don — BZ Family",
    html: `
      <h1>Merci ${donorName} !</h1>
      <p>Votre don de <strong>${amount}</strong> nous permet de continuer nos actions solidaires.</p>
      <p>Avec gratitude,<br/>L'équipe BZ Family</p>
    `,
  });
}
