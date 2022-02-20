const VALID_DOB_REGEX = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/

/**
 * Checks for a valid year/month/day
 */

module.exports.validDateOfBirth = dob => {
  return VALID_DOB_REGEX.test(dob)
}