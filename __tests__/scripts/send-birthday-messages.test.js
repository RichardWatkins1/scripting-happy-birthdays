const { sendBirthdayMessages } = require("../../scripts/send-birthday-messages")

describe("sendBirthdayMessages", () => {
  it("should message friends on their birthday", async () => {
    const mockDateObject = new Date("2000/03/20");
    const spy = jest
      .spyOn(Date, "now")
      .mockImplementation(() => mockDateObject);

    const result = await sendBirthdayMessages()

    expect(result).toEqual(true)

    spy.mockRestore();
  })
})