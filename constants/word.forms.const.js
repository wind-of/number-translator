const ClassPostfixes = {
    ONE_THING_POSTFIX: "",
    FEW_THINGS_POSTFIX: "а",
    MANY_OR_ZERO_THINGS_POSTFIX: "ов" 
}
const NonIntegers = {
  ENDS_WITH_ONE: 0, // {1}. // "одна сотая", "двести двадцать одна сотая", ...
  OTHERWISE: 1 // != 1. // "два сотых", "три сотых", ...
}

module.exports = {
  ClassPostfixes,
  NonIntegers
}
