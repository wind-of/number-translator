const WF = require('../index.js');

test("Кидает еррор, если передано нечисловое выражение", () => {
  ["fd", , "", [], {}, null, NaN].forEach(
      arg => expect(WF(arg)).toBeUndefined()
    )
})