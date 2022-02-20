const { sendMessages } = require("./scripts/send-messages")
const logger = require("pino")()

void (async () => await sendMessages())()
  .then(() => {
    logger.info("\nSuccessfully sent birthday emails");
  })
  .catch((error) => {
    logger.error("\n\tFailed to message friends", {error});
    logger.error("\nCaught unhandled error, exiting");
    process.exit(1);
  });