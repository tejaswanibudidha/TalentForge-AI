import Contact from '../models/Contact.js';

export async function saveContact(contactData) {
  const contact = new Contact(contactData);
  return contact.save();
}
