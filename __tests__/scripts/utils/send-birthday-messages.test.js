const { sendBirthdayMessages } = require("../../../scripts/utils")

describe("sendBirthdayMessages", () => {
  it("returns undefined if an empty array is provided", () => {
    const result = sendBirthdayMessages([])

    expect(result).toEqual(undefined)
  })

  it("returns undefined if an no args are provided", () => {
    const result = sendBirthdayMessages([])

    expect(result).toEqual(undefined)
  })
})