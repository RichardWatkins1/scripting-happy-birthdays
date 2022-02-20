const logger = require("pino")()
const VALID_DOB_REGEX = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/

/**
 * Checks for a valid year/month/day
 */

module.exports.validDateOfBirth = dob => {
  if (VALID_DOB_REGEX.test(dob)) {
    return true
  }

  const errorMessage = "Date of birth provided not the valid format of year/month/day"

  logger.error(errorMessage, { dob })

  throw new Error(errorMessage)
}