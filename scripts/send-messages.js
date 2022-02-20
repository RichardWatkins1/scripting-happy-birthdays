const logger = require("pino")()
const { fetchFriends, findMessageableFriends, sendBirthdayMessages } = require("../utils") 

module.exports.sendMessages = async () => {
  try {
    const friends = await fetchFriends()

    const messageableFriends = findMessageableFriends(friends)

    if (messageableFriends.length > 0) {
      await sendBirthdayMessages(messageableFriends)

      return true
    }

    logger.info("No friends to message today")

    return false
  } catch(err) {
    logger.error({message: "Failed to message friends", err})

    throw new Error("Failed to message friends")
  }
}