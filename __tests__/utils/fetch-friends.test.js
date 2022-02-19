const { fetchFriends } = require("../../utils/fetch-friends")

describe("fetchFriends", () => {
  it("returns a list of friends", async () => {
    const results = await fetchFriends()
    expect(results).toMatchSnapshot()
  })
})