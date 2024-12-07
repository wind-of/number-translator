"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.getHundreds = exports.getDozens = exports.getDigit = void 0
const word_forms_1 = require("../constants/word.forms")
const getDigit = (number) => word_forms_1.DIGITS[Number(number)]
exports.getDigit = getDigit
const getDozens = (number) => word_forms_1.DOZENS[Number(number) - 2]
exports.getDozens = getDozens
const getHundreds = (number) => word_forms_1.HUNDREDS[Number(number) - 1]
exports.getHundreds = getHundreds
