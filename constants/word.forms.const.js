const Classes = {
    ONE_THING: 0, // {1}. "один миллион"
    FEW_THINGS: 1, // [2;4]. "два миллиона"
    MANY_OR_ZERO_THINGS: 2 // {0}u[5;9]u[11;19]. "пять миллионов"
}
const NonIntegers = {
  ENDS_WITH_ONE: 0, // {1}. // "одна сотая", "двести двадцать одна сотая", ...
  OTHERWISE: 1 // != 1. // "два сотых", "три сотых", ...
}

module.exports = {
  Classes,
  NonIntegers
}
