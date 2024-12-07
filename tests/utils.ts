import { translateNumber } from "../index"
import { OutputTypesEnum } from "../types"

export function expectToBe(argument: any, expected: string, error = false): void {
  return expect(translateNumber(argument)).toEqual({
    message: expected,
    type: error ? OutputTypesEnum.OUTPUT_TYPE_ERROR : OutputTypesEnum.OUTPUT_TYPE_VALID,
  })
}
