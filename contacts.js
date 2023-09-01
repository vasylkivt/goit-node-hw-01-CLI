const path = require("path");
const { nanoid } = require("nanoid");

const { readJSONFromFile, writeJSONToFile } = require("./utils");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// Повертає масив контактів.
const listContacts = async () => {
  const list = await readJSONFromFile(contactsPath);
  return list;
};

// Повертає індекс контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactIndexById = ({ id, data }) => {
  const index = data.findIndex((el) => el.id === id);
  if (index === -1) return null;
  return index;
};

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
const getContactById = async ({ id }) => {
  const list = await listContacts();
  const contact = list.find((contact) => contact.id === id);
  return contact || null;
};

// Повертає об'єкт доданого контакту.
const addContact = async ({ ...data }) => {
  const newContact = { id: nanoid(20), ...data };
  const list = await listContacts();
  list.push(newContact);
  await writeJSONToFile(contactsPath, list);

  return newContact;
};

//  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
const removeContact = async ({ id }) => {
  const list = await listContacts();
  const result = getContactIndexById({ id, list });

  if (result) {
    const deletedContact = list.splice(result, 1);
    await writeJSONToFile(contactsPath, list);
    return deletedContact;
  }
  return result;
};

//  Повертає масив з контактів до обновлення і після. Повертає null, якщо контакт з таким id не знайдений.
const updateContact = async ({ id, ...inputData }) => {
  const list = await listContacts();
  const result = getContactIndexById({ id, list });

  if (result) {
    const prevContact = JSON.parse(JSON.stringify(list[result]));

    list[result] = { ...prevContact, ...inputData };
    const updatedContact = list[result];

    await writeJSONToFile(contactsPath, list);

    return [prevContact, updatedContact];
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
