# Number-translator

## How to use:
```javascript
    const { translateNumber } = require("number-translator");
    
    translateNumber(x)        // where x is number OR string of numbers.
    translateNumber(123)      // —> "сто двадцать три"
    translateNumber("123")    // —> "сто двадцать три"
    translateNumber(-1.23)    // —> "минус одна целая двадцать три сотых"
    translateNumber(2231.1)   // —> "две тысяча двести тридцать одна целая одна десятая"
```
## Breaking change in 2.0.0
`translateNumber` returns an object with two properties — `type` and `message`. This was done in order to distinguish if input was valid or not.
```javascript
    const { translateNumber } = require("number-translator");
    
    translateNumber(x)        // where x is number OR string of numbers.
    translateNumber(123)      // —> {message: "сто двадцать три", type: "valid"}
    translateNumber("123")    // —> {message: "сто двадцать три", type: "valid"}
    translateNumber(-1.23)    // —> {message: "минус одна целая двадцать три сотых", type: "valid"}
    translateNumber(2231.1)   // —> {message: "две тысяча двести тридцать одна целая одна десятая", type: "valid"}
    translateNumber("22.31.1")   // —> {message: /* EXTRA_SYMBOLS_ERROR */, type: "error"}
```

## Limits
#### Integer
Range: [-10<sup>306</sup> + 1, 10<sup>306</sup> - 1]

#### Non-integer
Range: [-10<sup>306</sup> + 10<sup>-305</sup>, 10<sup>306</sup> - 10<sup>-305</sup>]


## Errors
Every input passes the next tests in the same order before translating.
#### Not a number
Next values cause a return of [NOT_A_NUMBER]-error: empty value (nothing is passed), empty string (""), [], {}, null, NaN, undefined 
Also, if input is a string where the first symbol is not a number, function will return a [NOT_A_NUMBER]-error.

```javascript
translateNumber(); // —> "Passed value is not a number."
```

#### Not safe number
Then, if the passed value is a number (not a string of numbers) that is not from the range [-9007199254740991; 9007199254740991], it causes a return of the [NOT_SAFE_NUMBER]-error.

```javascript
translateNumber(13151521521513839838443821214); // —> "Passed number is not safe. Safe numbers are numbers in range [-9007199254740991; 9007199254740991]. You can pass the number wrapped in quotes to avoid this limitation."
```
#### Non-numeric symbols
Any character except of digits, "-" and "." causes a return of a [NON_NUMERIC_SYMBOLS]-error.

```javascript
translateNumber("21412f212412412"); // —> "There are non-numeric symbols in the passed string."
```
#### Extra symbols
If there are more than one of "-" or ".", then it returns an [EXTRA_SYMBOLS]-error.

```javascript
translateNumber("-2222222-222222"); // —> "Passed number is not a valid number."
```
#### Too big number
If the number is out of the limits, then it returns a [TOO_BIG_NUMBER]-error.

```javascript
translateNumber("1".repeat(307)); // —> "Passed number is not a valid number."
```
---
### Live demo: 
https://hstff.csb.app/