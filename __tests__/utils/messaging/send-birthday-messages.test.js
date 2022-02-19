const { sendBirthdayMessages } = require("../../../utils/messaging/send-birthday-messages")
const nock = require("nock")

/**
 * Intercepts http request to ses and returns valid response
 */

 const sesNockConstructor = (times = 1) => {
  let sesBody

  const sesNock = nock("https://email.eu-west-1.amazonaws.com:443")
    .post("/", body => {
      sesBody = body

      return true
    })
    .times(times)
    .reply(200);

  const sesMessage = () => sesBody

  return {
    sesNock,
    sesMessage
  }
}

describe("sendBirthdayMessages", () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("success", () => {
    it("sends a happy birthday email when messageType is email and a single friend is provided", async () => {
      const friend = [{
        firstName: "Richard",
        lastName: "test",
        dob: "01/01/1990",
        contact: "test@example.com",
        messageType: "email"
      }]
  
      const { sesNock, sesMessage } = sesNockConstructor()
  
      const response = await sendBirthdayMessages(friend)
  
      expect(response).toEqual({
        message: "Successfully sent 1 birthday messages"
      })
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
  
    it("sends multiple emails when friends are provided", async () => {
      const friend = [{
        firstName: "Richard",
        lastName: "test",
        dob: "01/01/1990",
        contact: "test@example.com",
        messageType: "email"
      },
      {
        firstName: "test",
        lastName: "testing",
        dob: "01/01/1990",
        contact: "test@example.com",
        messageType: "email"
      }]
  
      const { sesNock } = sesNockConstructor(2)
  
      const response = await sendBirthdayMessages(friend)
  
      expect(response).toEqual({
        message: "Successfully sent 2 birthday messages"
      })
      expect(sesNock.isDone()).toEqual(true)
    })
  })

  describe("failure", () => {
    it("returns undefined if an empty array is provided", async () => {
      const result = await sendBirthdayMessages([])
  
      expect(result).toEqual(false)
    })
  
    it("returns undefined if an no args are provided", async () => {
      const result = await sendBirthdayMessages()
  
      expect(result).toEqual(false)
    })
  })
})