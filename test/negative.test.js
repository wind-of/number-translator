const { expectToBe } = require("./utils");

test("Negative numbers", () => {
  expectToBe("-123", "минус сто двадцать три");
  expectToBe(-123, "минус сто двадцать три");
  expectToBe(-1251251, "минус один миллион двести пятьдесят одна тысяча двести пятьдесят один");
  expectToBe(-0, "ноль");
  expectToBe("-1001", "минус одна тысяча один");
})