const { validDateOfBirth } = require("../../../utils/filtering")

describe("validDateOfBirth", () => {
  it("returns true when year/month/day DOB is provided", () => {
    const result = validDateOfBirth("2000/01/30")

    expect(result).toEqual(true)
  })

  it("returns false when year/month/day month is invalid", () => {
    expect(() => validDateOfBirth("2000/30/30")).toThrow("Date of birth provided not the valid format of year/month/day")
  })

  it("returns false when year/month/day month is invalid", () => {
    expect(() => validDateOfBirth("2000/01/90")).toThrow("Date of birth provided not the valid format of year/month/day")
  })

  it("returns false when year/month/day year is invalid", () => {
    expect(() => validDateOfBirth("200/01/90")).toThrow("Date of birth provided not the valid format of year/month/day")
  })

  it("returns false when year-month-day is provided", () => {
    expect(() => validDateOfBirth("2000-01-28")).toThrow("Date of birth provided not the valid format of year/month/day")
  })
})