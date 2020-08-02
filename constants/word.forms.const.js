const ClassPostfixes = {
    ONE_THING_POSTFIX: ["1"], // {1}. "один миллион"
    FEW_THINGS_POSTFIX: ["2", "3", "4"], // [2;4]. "два миллиона"
    MANY_OR_ZERO_THINGS_POSTFIX: ["0", "5", "6", "7", "8", "9", "11", "12", "13", "14", "15", "16", "17", "18", '19'] // {0}u[5;9]u[11;19]. "пять миллионов"
}
const NonIntegers = {
  ENDS_WITH_ONE: 0, // {1}. // "одна сотая", "двести двадцать одна сотая", ...
  OTHERWISE: 1 // != 1. // "два сотых", "три сотых", ...
}

module.exports = {
  ClassPostfixes,
  NonIntegers
}
