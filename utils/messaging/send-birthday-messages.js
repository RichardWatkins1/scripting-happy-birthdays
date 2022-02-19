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
          logger.info("Sending Email Via SES", { friend })
          const response = await sendEmail(friend)
          logger.info("ses response", {response})
          logger.info(`sent ${friend.messageType} notification to ${friend.firstName} ${friend.lastName} via ${friend.contact}`)
      }
    }

    const successMessage = `Successfully sent ${friends.length} birthday messages`

    logger.info(successMessage)

    return {
      message: successMessage
    }
  }

  return false
}