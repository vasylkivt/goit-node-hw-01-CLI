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

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await operation.listContacts());
      break;

    case "get":
      console.log(await operation.getContactById({ id }));
      break;

    case "add":
      console.log(await operation.addContact({ name, email, phone }));
      break;

    case "update":
      console.log(await operation.updateContact({ id, name, email, phone }));
      break;

    case "remove":
      console.log(await operation.removeContact({ id }));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
