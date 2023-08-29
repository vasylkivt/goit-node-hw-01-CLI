const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// Повертає масив контактів.
const listContacts = async () =>
  JSON.parse((list = await fs.readFile(contactsPath)));

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async ({ id }) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === id);
  return contact || null;
};

// Повертає об'єкт доданого контакту.
const addContact = async ({ name, email, phone }) => {
  const newContact = { id: nanoid(20), name, email, phone };
  const data = await listContacts();

  const updateData = [...data, newContact];

  fs.writeFile(contactsPath, JSON.stringify(updateData));
  return newContact;
};

//  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async ({ id }) => {
  const data = await listContacts();
  const contact = await getContactById({ id });

  if (contact) {
    const updateData = data.filter((contact) => contact.id !== id);
    fs.writeFile(contactsPath, JSON.stringify(updateData));
  }
  return contact;
};

//  Повертає масив з контактів до обновлення і після. Повертає null, якщо контакт з таким id не знайдений.
const updateContact = async ({ id, name, email, phone }) => {
  const data = await listContacts();
  const prevContact = await getContactById({ id });

  if (prevContact) {
    const updateData = data.map((contact) =>
      contact.id === id ? { id, name, email, phone } : contact
    );
    fs.writeFile(contactsPath, JSON.stringify(updateData));
    return [prevContact, { id, name, email, phone }];
  }

  return prevContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
