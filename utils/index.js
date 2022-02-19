const { fetchFriends } = require("./fetch-friends")
const { findMessageableFriends } = require("./filtering-friends")
const { sendBirthdayMessages } = require("./messaging")

module.exports = {
  findMessageableFriends,
  fetchFriends,
  sendBirthdayMessages
}