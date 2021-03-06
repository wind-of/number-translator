const { expectToBe } = require("./utils");

test("Non-integer values", () => {
  expectToBe(12.12, "двенадцать целых двенадцать сотых");
  expectToBe("8485423247.2", "восемь миллиардов четыресто восемьдесят пять миллионов четыресто двадцать три тысячи двести сорок семь целых два десятых");
  expectToBe("0.32522", "ноль целых тридцать две тысячи пятьсот двадцать два стотысячных");
  expectToBe("1.00000000", "один");
  expectToBe("1.0000000000000000000000000001", "один целых одна десятиоктиллионная"); // Синтаксически неверный вывод: один целых —> одна целая
})