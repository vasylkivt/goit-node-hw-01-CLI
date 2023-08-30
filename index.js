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

async function invokeAction({ action, ...inputData }) {
  switch (action) {
    case "list":
      console.table(await operation.listContacts());
      break;

    case "get":
      console.log(await operation.getContactById({ ...inputData }));
      break;

    case "add":
      console.log(await operation.addContact({ ...inputData }));
      break;

    case "update":
      console.log(await operation.updateContact({ ...inputData }));
      break;

    case "remove":
      console.log(await operation.removeContact({ ...inputData }));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

/*

const actions = {
  list: operation.listContacts,
  get: operation.getContactById,
  add: operation.addContact,
  remove: operation.removeContact,
  update: operation.updateContact,
};

async function invokeAction({ action, ...inputData }) {
  try {
    const result = await actions[action]({ ...inputData });
    action === "list" ? console.table(result) : console.log(result);
  } catch (error) {
    console.warn("\x1B[31m Unknown action type!");
    console.warn("error:-------", error.message);
  }
}

*/


