const { validDateOfBirth } = require("./valid-date-of-birth")
const {shouldSendBirthdayMessage } = require("./should-send-birthday-message")

module.exports.findMessageableFriends = (friends, todaysDate = new Date()) => {
  if (friends && friends.length > 0) {
    return friends.filter(friend => {
      return friend && validDateOfBirth(friend.dob) && shouldSendBirthdayMessage(friend.dob, todaysDate)
    })
  }
  
  return []
}
