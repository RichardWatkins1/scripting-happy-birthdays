const { validDateOfBirth } = require("../../../utils/filtering")

describe("validDateOfBirth", () => {
  it("returns true when year/month/day DOB is provided", () => {
    const result = validDateOfBirth("2000/01/30")

    expect(result).toEqual(true)
  })

  it("returns false when year/month/day month is invalid", () => {
    const result = validDateOfBirth("2000/30/30")

    expect(result).toEqual(false)
  })

  it("returns false when year/month/day month is invalid", () => {
    const result = validDateOfBirth("2000/01/90")

    expect(result).toEqual(false)
  })

  it("returns false when year/month/day year is invalid", () => {
    const result = validDateOfBirth("200/01/90")

    expect(result).toEqual(false)
  })

  it("returns false when year-month-day is provided", () => {
    const result = validDateOfBirth("2000-01-28")

    expect(result).toEqual(false)
  })
})