const { sendMessages } = require("../../scripts/send-messages")
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

describe("sendMessages", () => {
  it("should message friends on their birthday", async () => {
    const mockDate = new Date("2000/03/20");
    // Mock the global Date
    global.Date = class extends Date {
      constructor(date) {
        if (date) {
          return super(date);
        }

        return mockDate;
      }
    };

    const { sesNock, sesMessage } = sesNockConstructor()

    const result = await sendMessages()

    expect(result).toEqual(true)
    expect(sesNock.isDone()).toEqual(true)
    expect(sesMessage()).toEqual({
      "Action": "SendEmail",
      "Destination.ToAddresses.member.1": "bill.shatner@example.com",
      "Message.Body.Html.Charset": "utf-8",
      "Message.Body.Html.Data": "<h1>Happy birthday, dear William!</h1>",
      "Message.Subject.Charset": "utf-8",
      "Message.Subject.Data": "Happy Birthday!",
      "Source": "user@example.com",
      "Version": "2010-12-01"
    })
    // reset the global Date
    global.Date = Date
  })

  it("should not message friends if it's not their birthday", async () => {
    const mockDate = new Date("2000/09/10");
    // Mock the global Date
    global.Date = class extends Date {
      constructor(date) {
        if (date) {
          return super(date);
        }

        return mockDate;
      }
    };

    const { sesNock } = sesNockConstructor()

    const result = await sendMessages()

    expect(result).toEqual(false)
    expect(sesNock.isDone()).toEqual(false)
    // reset the global Date
    global.Date = Date
  })

  it("throws and error if their is an error sending messages", async () => {
    // Simulate an error deep in our code
    global.Date = class extends Date {
      constructor(date) {
        if (date) {
          return super(date);
        }

        return undefined;
      }
    };

    await expect(sendMessages()).rejects.toThrowError("Failed to message friends")
    // reset the global Date
    global.Date = Date
  })
})