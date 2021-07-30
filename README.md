# Number-translator

## How to use:
```javascript
    const { translateNumber } = require("number-translator");
    
    translateNumber(x)        // where x is number OR string of numbers.
    translateNumber(123)      // —> "сто двадцать три"
    translateNumber("123")    // —> "сто двадцать три"
    translateNumber(-1.23)    // —> "минус одна целая двадцать три сотых"
    translateNumber(2231.1)   // —> "две тысяча двести тридцать одна целая сорок два сотых"
```
## Limits
#### Integer
Input may be 306 digits long. Maximal integer is "999...9" —> "девятьсот девяносто девять центиллионов ... девять"

#### Non-integer
Input may have 306 digits long integer part and 305 digits long non-integer part. 
Maximal non-integer is "999...9.999...9" — "девятьсот девяносто девять центиллионов ... девять целых девятьсот девяносто девять центиллионов ... девять стоцентиллионных"

#### Negative
The same rules apply for negative numbers.


## Errors
Every input passes the next tests in the same order before translating.
#### Not a number
Next values cause a throw of [NOT_A_NUMBER]-error: empty value (nothing is passed), empty string (""), [], {}, null, NaN, undefined 
Also, if input is a string where the first symbol is not a number, function will throw a [NOT_A_NUMBER]-error.

```javascript
translateNumber(); // —> "Passed value is not a number."
```

#### Not safe number
Then, if passed number is not from range [-9007199254740991; 9007199254740991], it causes a [NOT_SAFE_NUMBER]-error throw.

```javascript
translateNumber(13151521521513839838443821214); // —> "Passed number is not safe. Safe numbers are numbers in range [-9007199254740991; 9007199254740991]. You can pass the number wrapped in quotes to avoid this limitation."
```
#### Non-numeric symbols
Any characters except of digits, "-" and "." causes a throw of a [NON_NUMERIC_SYMBOLS]-error.

```javascript
translateNumber("21412f212412412"); // —> "There are non-numeric symbols in the passed string."
```
#### Extra symbols
If there are more than one of "-" or ".", then it throws an [EXTRA_SYMBOLS]-error.

```javascript
translateNumber("-2222222-222222"); // —> "Passed number is not a valid number."
```
---
### Live demo: 
https://hstff.csb.app/