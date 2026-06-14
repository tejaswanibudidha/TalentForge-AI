const CONTACTS_KEY = 'talentforge_contact_requests';

function loadContacts() {
  try {
    return JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveContacts(entries) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(entries));
}

export function getContacts() {
  return loadContacts().sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

export function saveContact({ name, email, subject, message }) {
  const contacts = loadContacts();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    subject,
    message,
    submittedAt: new Date().toISOString()
  };
  contacts.unshift(entry);
  saveContacts(contacts);
  return entry;
}
