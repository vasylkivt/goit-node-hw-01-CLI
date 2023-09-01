const operation = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .name("user-list")
  .description("CLI to work with the contact list")
  .version("1.0.0");

program
  .command("list")
  .description("Return a list of all contacts")
  .action(async () => {
    const list = await operation.listContacts();
    console.table(list);
  });

program
  .command("get")
  .description("Return a contact by ID ")
  .option("-i, --id <type>", "user id")
  .action(async ({ id }) => {
    const contact = await operation.getContactById({ id });
    console.log("contact:", contact);
  });

program
  .command("add")
  .description("Add a contact")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")
  .action(async ({ name, email, phone }) => {
    const contact = await operation.addContact({ name, email, phone });
    console.log("contact:", contact);
  });

program.parse();

// const { program } = require("commander");

// program
//   .option("-a, --action <type>", "choose action")
//   .option("-i, --id <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);
// const argv = program.opts();

// const actions = {
//   list: operation.listContacts,
//   get: operation.getContactById,
//   add: operation.addContact,
//   remove: operation.removeContact,
//   update: operation.updateContact,
// };

// async function invokeAction({ action, id, name, email, phone }) {
//   const result = await actions[action]({ id, name, email, phone });

//   action === "list" ? console.table(result) : console.log(result);
// }

// invokeAction(argv);
