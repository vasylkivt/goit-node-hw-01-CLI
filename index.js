const operation = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const actions = {
  list: operation.listContacts,
  get: operation.getContactById,
  add: operation.addContact,
  remove: operation.removeContact,
  update: operation.updateContact,
};

async function invokeAction({ action, id, name, email, phone }) {
  const result = await actions[action]({ id, name, email, phone });

  action === "list" ? console.table(result) : console.log(result);
}

invokeAction(argv);
