const { main } = require("./scripts/send-birthday-messages")
const logger = require("pino")()

void (async () => await main())()
  .then(() => {
    logger.info("\nSuccessfully sent birthday emails");
  })
  .catch((err) => {
    logger.warn({err})
    logger.error("\n\tFailed to message friends");
    logger.error("\nCaught unhandled error, exiting...");
    process.exit(1);
  });