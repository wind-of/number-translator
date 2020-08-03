const ClassPostfixes = {
    ONE_THING_POSTFIX: "",
    FEW_THINGS_POSTFIX: "а",
    MANY_OR_ZERO_THINGS_POSTFIX: "ов" 
}
const NonIntegersPostfixes = {
  ENDS_WITH_ONE: "ая",
  OTHERWISE: "ых"
}

module.exports = {
  ClassPostfixes,
  NonIntegersPostfixes
}
