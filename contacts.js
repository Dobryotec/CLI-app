const { writeFile, readFile } = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const deleteContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
};
