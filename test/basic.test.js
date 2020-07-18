const wordFrom = require('../index.js');
const expectToBe = (argument, expected) => expect(wordFrom(argument)).toBe(expected);

test("Цифры", () => {
  expectToBe(7, "семь");
  expectToBe("7", "семь");
  expectToBe("1", "один");
  expectToBe("2", "два");
  expectToBe(4, "четыре");
});

test("Числа от 10 до 20", () => {
  expectToBe(15, "пятнадцать");
  expectToBe("15", "пятнадцать");
  expectToBe("11", "одиннадцать");
  expectToBe(10, "десять");
  expectToBe(19, "девятнадцать");
});

test("Числа от 20 до 100", () => {
  expectToBe(20, "двадцать");
  expectToBe("97", "девяносто семь");
  expectToBe("51", "пятьдесят один");
  expectToBe("30", "тридцать");
  expectToBe(79, "семьдесят девять");
});

test("Числа от 100 до 1000", () => {
  expectToBe(100, "сто");
  expectToBe(200, "двести")
  expectToBe(592, "пятьсот девяносто два")
  expectToBe(132, "сто тридцать два")
  expectToBe(999, "девятьсот девяносто девять")
})

test("Числа от 1000 до 10000", () => {
  expectToBe(1000, "тысяча");
  expectToBe(2152, "два тысячи сто пятьдесят два");
  expectToBe(3592, "три тысячи пятьсот девяносто два");
  expectToBe(9999, "девять тысяч девятьсот девяносто девять");
  expectToBe(6835, "шесть тысяч восемьсот тридцать пять");
})