const logger = require("pino")()
const { sendEmail } = require("./send-email")

module.exports.sendBirthdayMessages = async (friends) => {
  if (friends && friends.length) {
    for (const friend of friends) {  
      switch(friend.messageType) {
        // Add different message types when appropriate
        // case "sms":
        //   const response = await sendSms()
        //   console.log("sms response", response)
        default:
          logger.info("Sending Email Via SES", { message })
          const response = await sendEmail(message)
          logger.info("ses response", {response})
      }
    }

    const successMessage = `sent ${friend.messageType} notification to ${friend.firstName} ${friend.lastName} via ${friend.contact}`

    logger.info(successMessage)
  }
}