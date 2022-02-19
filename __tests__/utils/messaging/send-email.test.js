const { sendEmail } = require("../../../utils/messaging/send-email")
const nock = require("nock")

/**
 * Intercepts http request to ses and returns valid response
 */

 const sesNockConstructor = () => {
  let sesBody

  const sesNock = nock("https://email.eu-west-1.amazonaws.com:443")
    .post("/", body => {
      sesBody = body

      return true
    })
    .times(1)
    .reply(200);

  const sesMessage = () => sesBody

  return {
    sesNock,
    sesMessage
  }
}

describe("sendEmail", () => {
  it("sends an email via SES", async () => {
    const friend = {
      firstName: "Richard",
      lastName: "test",
      dob: "01/01/1990",
      contact: "test@example.com",
      messageType: "email"
    }

    const { sesNock, sesMessage } = sesNockConstructor()

    await sendEmail(friend)

    expect(sesNock.isDone()).toEqual(true)
    expect(sesMessage()).toEqual({
      "Action": "SendEmail",
      "Destination.ToAddresses.member.1": "test@example.com",
      "Message.Body.Html.Charset": "utf-8",
      "Message.Body.Html.Data": "<h1>Happy birthday, dear Richard!</h1>",
      "Message.Subject.Charset": "utf-8",
      "Message.Subject.Data": "Happy Birthday!",
      "Source": "user@example.com",
      "Version": "2010-12-01"
    })
  })
})