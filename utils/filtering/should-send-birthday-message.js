/**
 * Should send a birthday message if today is the friends birthday or 
 * today is 28th of Feb and their birthday is the 29th of Feb
 * @param friend {object}
 * @param date {date}
 */

const TWENTY_EIGHT_FEB = "02/28" 
const TWENTY_NINTH_FEB = "02/29"

module.exports.shouldSendBirthdayMessage = (dob, todaysDate = new Date()) => {
  const [ year, month, day ] = [todaysDate.getUTCFullYear(), todaysDate.getUTCMonth() + 1,  todaysDate.getUTCDate()]

  const todaysMonthAndDay = pad(month) + "/" + pad(day)

  return  dob.includes(todaysMonthAndDay) || leapersBirthday(dob, todaysMonthAndDay, year)
}

// PRIVATE

const leapersBirthday = (dob, todaysMonthAndDay, year) => {
  return (todaysMonthAndDay.includes(TWENTY_EIGHT_FEB) && !leapYear(year)) && dob.includes(TWENTY_NINTH_FEB)
}

const leapYear = year => {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const pad = n => n < 10 ? '0' + n : n;
