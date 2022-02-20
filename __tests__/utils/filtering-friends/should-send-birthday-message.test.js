const { shouldSendBirthdayMessage } = require("../../../utils/filtering/should-send-birthday-message")

describe("shouldSendBirthdayMessage", () => {
  describe("matching date of birth", () => {
    it("returns true if dob matches today", () => {
      const dob = "2000/02/28"
      const TodaysDateMock = new Date("2001/02/28")
  
      const result = shouldSendBirthdayMessage(dob, TodaysDateMock)
  
      expect(result).toEqual(true)
    })
  
    it("returns false if dob does not match today", () => {
      const dob = "2000/01/30"
      const TodaysDateMock = new Date("2001/01/29")
  
      const result = shouldSendBirthdayMessage(dob, TodaysDateMock)
  
      expect(result).toEqual(false)
    })
  })

  describe("Handling leapers birthdays", () => {
    it("returns true if dob is 29th Feb and today is 28th Feb and it's not a leap year", () => {
      const dob = "2000/02/29"
      const TodaysDateMock = new Date("2001/02/28")
  
      const result = shouldSendBirthdayMessage(dob, TodaysDateMock)
  
      expect(result).toEqual(true)
    })
  
    it("returns true if dob is 29th Feb and today is 29th and it is a leap year", () => {
      const dob = "2000/02/29"
      const TodaysDateMock = new Date("2004/02/29")
  
      const result = shouldSendBirthdayMessage(dob, TodaysDateMock)
  
      expect(result).toEqual(true)
    })
  
    it("returns false on 28th Feb if the year is a leap year", () => {
      const dob = "2000/02/29"
      const TodaysDateMock = new Date("2004/02/28")
  
      const result = shouldSendBirthdayMessage(dob, TodaysDateMock)
  
      expect(result).toEqual(false)
    })
  })
})