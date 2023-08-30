const fs = require("fs").promises;
const path = require("path");
require("colors");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// Повертає масив контактів.
const listContacts = async () =>
  JSON.parse((list = await fs.readFile(contactsPath)));

// Повертає індекс контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactIndexById = ({ id, data }) => {
  const index = data.findIndex((el) => el.id === id);
  if (index === -1) return null;
  return index;
};

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async ({ id }) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === id);
  return contact || null;
};

// Повертає об'єкт доданого контакту.
const addContact = async ({ name = "", email = "", phone = "" }) => {
  if (name || email || phone) {
    const newContact = { id: nanoid(20), name, email, phone };
    const data = await listContacts();
    const updatedData = [...data, newContact];

    fs.writeFile(contactsPath, JSON.stringify(updatedData, null, 2));
    return newContact;
  }
  return "Cannot add a contact, enter name, email, or number...".red;
};

//  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async ({ id }) => {
  if (id) {
    const data = await listContacts();
    const result = getContactIndexById({ id, data });

    if (result) {
      const deletedContact = data.splice(result, 1);
      fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
      return deletedContact;
    }
    return result;
  }
  return "Cannot delete a contact, enter the contact ID you want to delete..."
    .red;
};

//  Повертає масив з контактів до обновлення і після. Повертає null, якщо контакт з таким id не знайдений.
const updateContact = async ({ id, ...inputData }) => {
  if (id) {
    const data = await listContacts();
    const result = getContactIndexById({ id, data });

    if (result) {
      const prevContact = data[result];
      data[result] = { ...prevContact, ...inputData };

      const updatedContact = data[result];

      fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
      return [prevContact, updatedContact];
    }
    return result;
  }
  return "cannot update the contact, enter the contact ID you want to update..."
    .red;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
