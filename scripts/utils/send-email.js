const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const logger = require("pino")()

const client = new SESClient({region: "eu-west-1"});


module.exports.sendEmail = async (friend) => {
  if (friend) {
    const sendEmailConfig = {
      Source: "richardwatkins1@gmail.com",
      Destination: {
        ToAddresses: [friend.contact],
      },
      Message: {
        Subject: {
          Data: "Happy Birthday!",
          Charset: "utf-8",
        },
        Body: {
          Html: {
            Data: `<h1>Happy birthday, dear ${friend.firstName}!</h1>`,
            Charset: "utf-8",
          },
        },
      },
    };

    const command = new SendEmailCommand(sendEmailConfig);
    const response = await client.send(command);
    logger.info({response})

    return {message: `sent email notification to ${friend.contact}`}
  }
}