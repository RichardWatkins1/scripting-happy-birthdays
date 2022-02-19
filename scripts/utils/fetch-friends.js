
const csv = require('@fast-csv/parse');
const logger = require("pino")()
const path = require("path")

module.exports.fetchFriends = async () => {
  const stream = csv.parseFile(path.join(__dirname, "friends.csv"), { headers: true, trim: true });

  let friends = []

  for await (const row of stream) {

    const publishabledMesage = {
      firstName: row.first_name,
      lastName: row.last_name,
      dob: row.date_of_birth,
      contact: row.email,
      messageType: "email"
    };

    friends.push(publishabledMesage)
  }

  logger.info({message: "fetched friends", friends})
  
  return friends
}